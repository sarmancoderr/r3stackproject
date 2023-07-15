import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "~/server/db";
import * as bcrypt from 'bcryptjs'
import { AuthUser, jwtHelper, tokenOnWeek, tokenOneDay } from "~/utils/jwtHelper";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60
  },
  callbacks: {
    session: async ({ session, token }) => {
      const user = await prisma.user.findFirst({
        where: {
          email: token.email!
        }
      })

      if (!user) {
        return {...session}
      }

      return {
        ...session,
        id: user.id
      }
    },
    async jwt(ctx) {
      const {token, user} = ctx
      if (user) {
        const authUser = {id: user.id, email: user.email} as AuthUser;

        const accessToken = await jwtHelper.createAcessToken(authUser);
        const refreshToken = await jwtHelper.createRefreshToken(authUser);
        const accessTokenExpired = Date.now() /1000 + tokenOneDay;
        const refreshTokenExpired = Date.now() /1000 + tokenOnWeek;

        return {
          ...token, accessToken, refreshToken, accessTokenExpired, refreshTokenExpired,
          user: authUser
        }
      }

      return token
    }
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = await prisma.user.findFirst({
          where: {
            email: credentials?.email
          }
        })

        if (!user) {
          return null
        }

        if (!(await bcrypt.compare(credentials!.password, user.password))) {
          return null
        }

        console.log('USUARIO AUTENTICADO CORRECTAMENTE', user)

        return user
      }
    })
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
