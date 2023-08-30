export default function TodosStatus({ todosCount, onClearCompleted }) {
  return (
    <div className="flex justify-between p-4 py-5 pb-0 text-dark-grayish-blue text-sm font-medium ">
      <p>{todosCount} items left</p>
      <button
        onClick={onClearCompleted}
        className="cursor-pointer text-very-dark-grayish-blue-1 hover:text-very-dark-grayish-blue-2 dark:hover:text-light-grayish-blue-hover"
      >
        Clear Completed
      </button>
    </div>
  );
}
