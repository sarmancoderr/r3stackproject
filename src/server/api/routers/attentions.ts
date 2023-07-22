import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const attentionsRouter = createTRPCRouter({
    createAttention: protectedProcedure.input(z.object({dateAttention: z.string(), comment: z.string(), partnerId: z.string()}))
        .mutation(async ({input, ctx}) => {
            return await ctx.prisma.attention.create({
                data: {
                    ...input,
                    dateAttention: new Date(input.dateAttention).toISOString()
                }
            })
        }),
    attentionsOfPartner: protectedProcedure.input(z.object({partnerId: z.string()})).query(async ({input, ctx}) => {
        return await ctx.prisma.attention.findMany({
            where: {
                partnerId: input.partnerId
            },
            orderBy: {
                dateAttention: "desc"
            }
        })
    })
})