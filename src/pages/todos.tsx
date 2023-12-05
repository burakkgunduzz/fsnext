import { api } from "@/utils/api";
import Head from "next/head";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Todos() {
  const [todoInput, setTodoInput] = useState("");
  const ctx = api.useUtils();

  const { data, isLoading } = api.todo.getAll.useQuery();

  const { mutate } = api.todo.create.useMutation({
    onSuccess: () => {
      setTodoInput("");
      void ctx.todo.invalidate();
    },
    onError: (err) => {
      const errorMessage = err.data?.zodError?.formErrors;
      if (errorMessage?.[0]) toast.error(errorMessage[0]);
      else toast.error(err.message);
    },
  });

  const { mutate: updateTodo, isLoading: isTodoUpdating } =
    api.todo.update.useMutation({
      onSuccess: () => {
        void ctx.todo.invalidate();
        toast.success("Updated successfully!");
      },
    });

  const { mutate: deleteTodoMutation } = api.todo.delete.useMutation({
    onSuccess: () => {
      void ctx.todo.invalidate();
      toast.success("Deleted successfully!");
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Something Went Wrong!</div>;

  // type TodoType = RouterOutputs["todos"]["getAll"]

  return (
    <div>
      <Head>
        <title>Todos</title>
      </Head>
      <div>
        <div className="flex flex-col text-xl text-white">
          <label htmlFor="todo-input">enter your todo here</label>
          <input
            onChange={(e) => setTodoInput(e.target.value)}
            value={todoInput}
            id="todo-input"
            type="text"
            className="text-black"
          />
        </div>
        <button
          type="submit"
          onClick={() => {
            mutate(todoInput);
          }}
          className="mt-2 rounded bg-blue-100 p-2 text-xl text-blue-400"
        >
          submit new todo
        </button>
      </div>

      <div className="mt-4">
        <h1 className="text-center text-2xl text-white">Todo List</h1>
        <ul className="ml-4">
          {data.map((todo) => (
            <li key={todo.id} className="mb-2 text-white">
              <input
                type="checkbox"
                className="mr-1"
                checked={todo.completed}
                onChange={(evt) => {
                  updateTodo({
                    todoId: todo.id,
                    completed: evt.target.checked,
                  });
                }}
                disabled={isTodoUpdating}
              />
              {todo.text}{" "}
              <button
                onClick={() => deleteTodoMutation({ todoId: todo.id })}
                className="rounded bg-white p-1 text-red-700"
              >
                delete me
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
