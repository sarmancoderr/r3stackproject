import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
} from "~/server/api/trpc";

export const partnerRouter = createTRPCRouter({
    addPartner: publicProcedure
        .input(z.object({ name: z.string(), surname: z.string(), dni: z.string() }))
        .mutation(async ({ctx, input}) => {
            return await ctx.prisma.partner.create({
                data: input
            })
        }),
    allPartners: publicProcedure
        .query(async ({ctx}) => {
            return await ctx.prisma.partner.findMany({})
        })
})