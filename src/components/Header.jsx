import { useRef, useState, useEffect } from "react";

export default function Header({ onAddTodo, colorTheme, setColorTheme }) {
  const [title, setTitle] = useState("");
  const inputRef = useRef();

  function toggleTheme() {
    let theme = localStorage.getItem("theme");
    let newTheme = theme === "light" ? "dark" : "light";

    localStorage.setItem("theme", newTheme);

    console.log(theme);
    setColorTheme(newTheme);
  }

  useEffect(function () {
    inputRef.current.focus();
  }, []);

  function createTodo(e) {
    // e.preventDefault();
    if (e.code === "Enter") {
      onAddTodo(title);
      setTitle("");
    }
  }

  function createTodoOnSubmit(e) {
    e.preventDefault();
    AddTodo(title);
    setTitle;
  }

  return (
    <header className="flex flex-col gap-8 pt-10 md:max-w-4xl mx-auto ">
      <div className="flex justify-between items-center ">
        <h1 className="text-3xl uppercase text-white font-bold tracking-[6px]">
          Todo
        </h1>
        <img
          src={
            colorTheme === "light"
              ? "images/icon-moon.svg"
              : "images/icon-sun.svg"
          }
          alt="Moon Icon"
          className="w-6"
          onClick={toggleTheme}
        />
      </div>
      <div className="bg-white flex items-center rounded-lg dark:bg-very-dark-desaturated-blue ">
        <div className="w-5 h-5 border-[1px] border-light-grayish-blue rounded-full mr-4 m-3 mx-5 dark:border-very-dark-grayish-blue-1"></div>
        <form onSubmit={createTodoOnSubmit}>
          <input
            type="text"
            placeholder="Create a new todo..."
            className="placeholder:leading-none text-lg h-full w-full p-4 px-0 bg-transparent focus:outline-none mt-1 dark:placeholder:text-dark-grayish-blue dark:text-light-grayish-blue"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            ref={inputRef}
            onKeyDown={(e) => createTodo(e)}
          />
        </form>
      </div>
    </header>
  );
}
