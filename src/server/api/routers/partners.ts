import { z } from "zod";
import {
    createTRPCRouter,
    protectedProcedure,
} from "~/server/api/trpc";

export const partnerRouter = createTRPCRouter({
    addPartner: protectedProcedure
        .input(z.object({ name: z.string(), surname: z.string(), dni: z.string() }))
        .mutation(async ({ctx, input}) => {
            return await ctx.prisma.partner.create({
                data: input
            })
        }),
    allPartners: protectedProcedure
        .query(async ({ctx}) => {
            return await ctx.prisma.partner.findMany({})
        }),
    getPartner: protectedProcedure.input(z.object({id: z.string().nonempty()})).query(async ({input, ctx}) => {
        return await ctx.prisma.partner.findUniqueOrThrow({
            where: {
                id: input.id
            }
        })
    }),
    updatePartner: protectedProcedure.input(z.object({name: z.string(), surname: z.string(), dni: z.string(), id: z.string().nonempty()}))
        .mutation(async ({ctx, input}) => {
            const {id, ...update} = input
            await ctx.prisma.partner.update({
                where: {id},
                data: update
            })

            return true
        }),
    removePartner: protectedProcedure.input(z.object({id: z.string().nonempty()})).mutation(async ({input, ctx}) => {
            return await ctx.prisma.partner.delete({
                where: {
                    id: input.id
                }
            })
        }),
})