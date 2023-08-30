import { useDrag } from "react-dnd";
import CheckIcon from "../assets/images/icon-check.svg";
import CrossIcon from "../assets/images/icon-cross.svg";

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
        className={`p-3 pt-0 flex items-center border-b-[1px] gap-4 dark:border-very-dark-grayish-blue-2 cursor-move ${
          isDragging ? "bg-slate-100 dark:bg-very-dark-grayish-blue-2" : ""
        }`}
      >
        <div
          className={`py-[5px] flex items-center justify-center px-[4px] rounded-full border-[1px] border-light-grayish-blue  ${
            todo.isCompleted
              ? "bg-gradient-to-br from-gradient-start to-gradient-end border-none"
              : ""
          } dark:border-very-dark-grayish-blue-1`}
          onClick={() => onCompleteTodo(todo.id)}
          role="button"
        >
          <img
            src={CheckIcon}
            alt="Check Icon"
            className={`${todo.isCompleted ? "opacity-100" : "opacity-0"}`}
          />
        </div>
        <h2
          className={`mr-auto text-sm md:text-md cursor-pointer ${
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
          <img src={CrossIcon} alt="Cross Icon" />
        </div>
      </div>
    </>
  );
}
