import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import * as bcrypt from 'bcryptjs'
import { TRPCError } from "@trpc/server";

export const usersRouter = createTRPCRouter({
  create: protectedProcedure.input(z.object({user: z.string(), password: z.string()}))
    .mutation(async ({ctx, input}) => {
        const existingUser = await ctx.prisma.user.findFirst({
            where: {email: input.user}
        })
        if (existingUser) {
            throw new TRPCError({
                code: 'CONFLICT',
                message: 'El usuario existe'
            })
        }
        return await ctx.prisma.user.create({
            data: {
                email: input.user,
                password: await bcrypt.hash(input.password, 8)
            }
        })
    })
})