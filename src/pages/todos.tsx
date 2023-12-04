import { api } from "@/utils/api";

export default function Todos() {
  const { data, isLoading } = api.todos.getAll.useQuery();

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Something Went Wrong!</div>;

  return (
    <div>
      <div>
        <div className="flex flex-col text-xl text-white">
          <label htmlFor="todo-input">enter your todo here</label>
          <input id="todo-input" type="text" />
        </div>
        <button className="mt-2 rounded bg-blue-100 p-2 text-xl text-blue-400">
          submit new todo
        </button>
      </div>

      <div className="mt-4">
        <h1 className="text-center text-2xl text-white">Todo List</h1>
        <ul>
          {data.map((todo) => (
            <li>{todo.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
