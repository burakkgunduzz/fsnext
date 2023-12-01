export default function Todos() {
  return (
    <div className="min-h-screen  bg-gradient-to-b from-[#2e026d] to-[#15162c]">
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
        <ul></ul>
      </div>
    </div>
  );
}
