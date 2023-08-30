import { useState } from "react";
import Todo from "./Todo";
import TodosStatus from "./TodoStatus";

import { useDrop } from "react-dnd";

function swapObjectsById(array, id1, id2) {
  const index1 = array.findIndex((obj) => obj.id === id1);
  const index2 = array.findIndex((obj) => obj.id === id2);

  if (index1 === -1 || index2 === -1) {
    // One or both IDs not found
    return array;
  }

  // Swap objects
  const temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;

  return array;
}

const DroppableTarget = ({ todoId, reOrderTodos }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TODO",
    drop: (draggedTodo) => reOrderTodos(draggedTodo, todoId),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`h-3 ${
        isOver ? "p-2  py-6 border-2 border-dashed border-slate-200 " : ""
      } `}
    ></div>
  );
};

export default function Todos({
  todos,
  handleCompleteTodo,
  onClearCompleted,
  onDeleteTodo,
  setTodos,
}) {
  function reOrderTodos(draggedTodo, todoId) {
    let swappedTodos;
    setTodos((todos) => {
      let newTodos = [...todos];
      swappedTodos = swapObjectsById(newTodos, draggedTodo.id, todoId);
      return swappedTodos;
    });
    localStorage.setItem("todos", JSON.stringify(swappedTodos));
  }
  const todosLeftCount = todos?.filter((todo) => !todo.isCompleted).length;

  return (
    <div className="flex flex-col mt-5 py-4 bg-white rounded-lg shadow-lg shadow-very-light-grayish-blue mx-auto md:shadow-none dark:bg-very-dark-desaturated-blue dark:shadow-very-dark-grayish-blue-1 dark:shadow-none md:max-w-[33rem] md:rounded-b-lg">
      {todos &&
        todos?.map((todo) => {
          if (todo.isShown) {
            return (
              <div key={todo.id}>
                <DroppableTarget todoId={todo.id} reOrderTodos={reOrderTodos} />
                <Todo
                  todo={todo}
                  onCompleteTodo={handleCompleteTodo}
                  onDeleteTodo={onDeleteTodo}
                />
              </div>
            );
          }
        })}

      {todos.length <= 0 ? (
        <p className="w-full my-8 text-center dark:text-light-grayish-blue">
          Start Adding Todos
        </p>
      ) : null}

      <TodosStatus
        todosCount={todosLeftCount}
        onClearCompleted={onClearCompleted}
      />
    </div>
  );
}
