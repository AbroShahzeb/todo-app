import { useState } from "react";

export default function TodoCategories({ onFilterTodos }) {
  const [activeCategory, setActiveCategory] = useState("all");
  return (
    <div className="flex justify-center items-center gap-5 p-4 mt-4   rounded-lg  text-md md:border-t-[1px] text-dark-grayish-blue font-medium md:max-w-4xl md:mx-auto md:rounded-t-none md:rounded-b-lg shadow-2xl shadow-very-light-grayish-blue md:shadow-none bg-white dark:shadow-none dark:bg-very-dark-desaturated-blue dark:border-t-very-dark-grayish-blue-1 md:absolute md:bottom-0 md:left-1/2 md:-translate-x-1/2 md:border-none md:pt-3">
      <p
        className={`${
          activeCategory === "all" ? "text-bright-blue" : ""
        }  cursor-pointer hover:text-very-dark-grayish-blue dark:hover:text-light-grayish-blue-hover`}
        onClick={() => {
          onFilterTodos("all");
          setActiveCategory("all");
        }}
      >
        All
      </p>
      <p
        className={`${
          activeCategory === "active" ? "text-bright-blue" : ""
        }  cursor-pointer 
        hover:text-very-dark-grayish-blue dark:hover:text-light-grayish-blue-hover`}
        onClick={() => {
          onFilterTodos("active");
          setActiveCategory("active");
        }}
      >
        Active
      </p>
      <p
        className={`${
          activeCategory === "completed" ? "text-bright-blue" : ""
        }  cursor-pointer hover:text-very-dark-grayish-blue dark:hover:text-light-grayish-blue-hover`}
        onClick={() => {
          onFilterTodos("completed");
          setActiveCategory("completed");
        }}
      >
        Completed
      </p>
    </div>
  );
}
