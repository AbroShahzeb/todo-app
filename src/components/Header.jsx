import { useRef, useState, useEffect } from "react";
import MoonIcon from "../assets/images/icon-moon.svg";
import SunIcon from "../assets/images/icon-sun.svg";

export default function Header({ onAddTodo, colorTheme, setColorTheme }) {
  const [title, setTitle] = useState("");
  const inputRef = useRef();

  function toggleTheme() {
    let theme = localStorage.getItem("theme");
    let newTheme = theme === "light" ? "dark" : "light";

    localStorage.setItem("theme", newTheme);

    setColorTheme(newTheme);
  }

  useEffect(function () {
    inputRef.current.focus();
  }, []);

  function createTodo(e) {
    if (e.code === "Enter") {
      onAddTodo(title);
      setTitle("");
    }
  }

  function createTodoOnSubmit(e) {
    e.preventDefault();
    onAddTodo(title);
    setTitle("");
  }

  return (
    <header className="flex flex-col gap-8 pt-10 md:max-w-4xl mx-auto ">
      <div className="flex justify-between items-center ">
        <h1 className="text-3xl uppercase text-white font-bold tracking-[6px]">
          Todo
        </h1>
        <img
          src={colorTheme === "light" ? MoonIcon : SunIcon}
          alt="Moon Icon"
          className="w-6"
          onClick={toggleTheme}
        />
      </div>
      <div className="bg-white flex items-center rounded-lg dark:bg-very-dark-desaturated-blue ">
        <div className="p-2 border-[1px] border-light-grayish-blue rounded-full mr-4 m-3 mx-5 dark:border-very-dark-grayish-blue-1"></div>
        <form onSubmit={createTodoOnSubmit} className="w-full">
          <input
            type="text"
            placeholder="Create a new todo..."
            className="placeholder:leading-none text-sm h-full w-full p-4 px-0 bg-transparent focus:outline-none mt-1 dark:placeholder:text-dark-grayish-blue dark:text-light-grayish-blue md:shadow-2xl md:shadow-very-light-grayish-blue dark:shadow-very-dark-grayish-blue-1 dark:shadow-none pr-2 md:text-md"
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
