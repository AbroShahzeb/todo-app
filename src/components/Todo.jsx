import { useDrag } from "react-dnd";

export default function Todo({ todo, onCompleteTodo, onDeleteTodo }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TODO",
    item: { id: todo.id, title: todo.title },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <>
      <div
        ref={drag}
        className={`p-4 flex items-center border-b-[1px] gap-4 dark:border-very-dark-grayish-blue-1 cursor-move ${
          isDragging ? "border-dashed border-2 border-bright-blue " : ""
        }`}
      >
        <div
          className={`py-[7px] flex items-center justify-center px-[6px] rounded-full border-[1px] border-light-grayish-blue ${
            todo.isCompleted
              ? "bg-gradient-to-br from-gradient-start to-gradient-end border-none"
              : ""
          } dark:border-very-dark-grayish-blue-1`}
          onClick={() => onCompleteTodo(todo.id)}
          role="button"
        >
          <img
            src="/images/icon-check.svg"
            alt="Check Icon"
            className={`${todo.isCompleted ? "opacity-100" : "opacity-0"}`}
          />
        </div>
        <h2
          className={`mr-auto text-md md:text-lg cursor-pointer ${
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
    </>
  );
}
