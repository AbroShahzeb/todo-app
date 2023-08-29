import Todo from "./Todo";
import TodosStatus from "./TodoStatus";

export default function Todos({
  todos,
  handleCompleteTodo,
  onClearCompleted,
  onDeleteTodo,
}) {
  const todosLeftCount = todos.filter((todo) => !todo.isCompleted).length;

  return (
    <div className="flex flex-col mt-5 py-4 bg-white rounded-lg shadow-lg shadow-very-light-grayish-blue md:max-w-4xl mx-auto md:shadow-none md:rounded-b-none dark:bg-very-dark-desaturated-blue dark:shadow-very-dark-grayish-blue-1">
      {todos.length ? (
        todos.map((todo) => {
          if (todo.isShown) {
            return (
              <Todo
                todo={todo}
                key={todo.id}
                onCompleteTodo={handleCompleteTodo}
                onDeleteTodo={onDeleteTodo}
              />
            );
          }
        })
      ) : (
        <p className="w-full my-8 text-center">Start Adding Todos</p>
      )}
      <TodosStatus
        todosCount={todosLeftCount}
        onClearCompleted={onClearCompleted}
      />
    </div>
  );
}
