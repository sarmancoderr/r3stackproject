import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { z } from "zod";
import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";

export const partnerRouter = createTRPCRouter({
    addPartner: publicProcedure
        .input(z.object({ name: z.string(), surname: z.string(), dni: z.string() }))
        .mutation(async (opts) => {
            return await prisma.partner.create({
                data: opts.input
            })
        }),
    allPartners: publicProcedure
        .query(async () => {
            return await prisma.partner.findMany({})
        })
})