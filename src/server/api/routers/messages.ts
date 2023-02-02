import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const messagesRouter = createTRPCRouter({
  createMessage: publicProcedure.input(z.string()).mutation(
    async ({ ctx, input }) =>
      await ctx.prisma.message.create({
        data: {
          text: input,
        },
      })
  ),

  getMessagesHistory: publicProcedure.query(async ({ ctx }) => {
    const messages = await ctx.prisma.message.findMany();

    return messages;
  }),
});
