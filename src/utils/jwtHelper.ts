import { encode, decode } from "next-auth/jwt";
import { User } from "@prisma/client";
import { env } from "~/env.mjs";

export interface AuthUser extends Omit<User, "Password">{}

export const tokenOneDay = 24 * 60 * 60;
export const tokenOnWeek = tokenOneDay * 7 


const craeteJWT = async (token:AuthUser, duration: number) => {
    console.log(env)
    console.log('ANTES DE LLAMAR A ENCODE', process.env.JWT_SECRET)
    console.log('TOKEN', await encode({token, secret: process.env.JWT_SECRET as string, maxAge: duration}))
    console.log('DESPUES DE LLAMAR A ENCODE')
    return await encode({token, secret: process.env.JWT_SECRET as string, maxAge: duration})
}

export const jwtHelper = {
  createAcessToken: (token:AuthUser) => craeteJWT(token, tokenOneDay),
  createRefreshToken: (token:AuthUser) => craeteJWT(token, tokenOnWeek),
  verifyToken: (token:string) => decode({token, secret: (env as any).JWT_SECRET})
}