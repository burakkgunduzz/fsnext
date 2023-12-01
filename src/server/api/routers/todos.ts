import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

export const todosRouter = createTRPCRouter({
    // create: protectedProcedure
    // .input(z.string().min(2,"your todo should be at least 2 characters length"))
    // .mutation(({ctx, input}) => {
    //     return ctx.db.todo.create({
    //         data: {
    //             text :input.text,
    //             completed: false,
    //             createdBy: { connect: { id: ctx.session.user.id } }
    //             }
    //     })
    // })
})