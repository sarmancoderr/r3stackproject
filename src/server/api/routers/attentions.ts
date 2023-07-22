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
    }),
    updateAttention: protectedProcedure.input(z.object({attentionId: z.string(), dateAttention: z.string(), comment: z.string()}))
        .mutation(async ({ctx, input}) => {
            const {attentionId, ...update} = input
            await ctx.prisma.attention.update({
                where: {id: attentionId},
                data: {
                    ...update,
                    dateAttention: new Date(input.dateAttention).toISOString()
                }
            })
            return true
        }),
    removeAttention: protectedProcedure.input(z.object({attentionId: z.string()})).mutation(async ({input, ctx}) => {
        await ctx.prisma.attention.delete({
            where: {id: input.attentionId}
        })

        return true
    })
})