import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { TRPCError } from "@trpc/server";

// Create a new ratelimiter, that allows 3 requests per 10 seconds
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "10 s"),
  analytics: true,
});

export const todoRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.todo.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
      where: {
        author: {
          id: ctx.session.user.id,
        },
      },
    });
  }),

  create: protectedProcedure
    .input(
      z.string().min(2, "your todo should be at least 2 characters length"),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { success } = await ratelimit.limit(userId);

      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      return ctx.db.todo.create({
        data: {
          text: input,
          completed: false,
          author: { connect: { id: userId } },
        },
      });
    }),

  update: protectedProcedure
    .input(z.object({ todoId: z.string(), completed: z.boolean() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.todo.update({
        where: { id: input.todoId, userId: ctx.session.user.id },
        data: { completed: input.completed },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ todoId: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.todo.delete({
        where: { id: input.todoId, userId: ctx.session.user.id },
      });
    }),
});
