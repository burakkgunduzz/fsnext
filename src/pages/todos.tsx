import { api } from "@/utils/api";
import Head from "next/head";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Todos() {
  const [todoInput, setTodoInput] = useState("");

  const ctx = api.useUtils();
  const { data, isLoading } = api.todos.getAll.useQuery();
  const { mutate } = api.todos.create.useMutation({
    onSuccess: () => {
      setTodoInput("");
      void ctx.todos.invalidate();
    },
    onError: (err) => {
      const errorMessage = err.data?.zodError?.formErrors;
      if (errorMessage?.[0]) toast.error(errorMessage[0]);
      else toast.error(err.message);
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
        <ul>
          {data.map((todo) => (
            <li className="text-white">{todo.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
