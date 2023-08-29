import { useState } from "react";

export default function TodoCategories({ onFilterTodos }) {
  const [activeCategory, setActiveCategory] = useState("all");
  return (
    <div className="flex justify-center items-center gap-5 p-4 mt-4   rounded-lg  text-md md:mt-0 md:border-t-[1px] text-dark-grayish-blue font-medium md:max-w-4xl md:mx-auto md:rounded-t-none md:rounded-b-lg shadow-2xl shadow-very-light-grayish-blue md:shadow-none bg-white">
      <p
        className={`${
          activeCategory === "all" ? "text-bright-blue" : ""
        }  cursor-pointer`}
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
        }  cursor-pointer`}
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
        }  cursor-pointer hover:text-very-dark-grayish-blue`}
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
