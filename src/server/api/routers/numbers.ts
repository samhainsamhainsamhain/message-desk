import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const numbersRouter = createTRPCRouter({
  calculateAverageNumber: publicProcedure
    .input(z.number())
    .mutation(async ({ ctx, input: num }) => {
      const prevAvgCalculation = await ctx.prisma.avgCalculation.findFirst({
        orderBy: { createdAt: "desc" },
      });

      const prevNum = prevAvgCalculation?.num || 0;

      const newAvgCalculation = await ctx.prisma.avgCalculation.create({
        data: { num, prevNum },
      });

      return newAvgCalculation;
    }),

  geCalculationsHistory: publicProcedure.query(async ({ ctx }) => {
    const calculations = await ctx.prisma.avgCalculation.findMany();

    return calculations;
  }),
});
