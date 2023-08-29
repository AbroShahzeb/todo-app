export default function Todo({ todo, onCompleteTodo, onDeleteTodo }) {
  return (
    <div className="p-4 flex items-center border-b-[1px] gap-4 ">
      <div
        className={`py-2 flex items-center justify-center px-[7px] rounded-full border-[1px] border-light-grayish-blue ${
          todo.isCompleted
            ? "bg-gradient-to-br from-gradient-start to-gradient-end border-none"
            : ""
        } dark:border-very-dark-grayish-blue-1`}
        role="button"
        onClick={() => onCompleteTodo(todo.id)}
      >
        <img
          src="/images/icon-check.svg"
          alt="Check Icon"
          className={`${todo.isCompleted ? "opacity-100" : "opacity-0"}`}
        />
      </div>
      <h2
        className={`mr-auto text-sm md:text-lg cursor-pointer ${
          todo.isCompleted
            ? "text-light-grayish-blue dark:text-very-dark-grayish-blue-1 line-through"
            : "text-very-dark-grayish-blue dark:text-light-grayish-blue"
        } dark:text-light-grayish-blue`}
        onClick={() => onCompleteTodo(todo.id)}
      >
        {todo.title}
      </h2>
      <div
        className="w-4 h-4"
        role="button"
        onClick={() => onDeleteTodo(todo.id)}
      >
        <img src="/images/icon-cross.svg" alt="Cross Icon" />
      </div>
    </div>
  );
}
