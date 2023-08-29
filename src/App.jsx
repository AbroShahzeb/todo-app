import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Todos from "./components/Todos";
import TodoCategories from "./components/TodoCategories";

function App() {
  const [todos, setTodos] = useState([]);
  const [colorTheme, setColorTheme] = useState("");

  useEffect(function () {
    let theme = localStorage.getItem("theme");
    if (!theme) localStorage.setItem("theme", "light");
    setColorTheme(theme);
  }, []);

  function handleAddTodo(title) {
    const newTodo = {
      id: crypto.randomUUID(),
      title: title,
      isCompleted: false,
    };
    console.log("Calling Add Todo", title);
    setTodos((todos) => [newTodo, ...todos]);
  }

  function handleCompleteTodo(id) {
    console.log("Inside handle complete todo");
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  }

  function handleFilterTodos(filterCriteria) {
    if (filterCriteria === "active") {
      setTodos((todos) =>
        todos.map((todo) =>
          todo.isCompleted
            ? { ...todo, isShown: false }
            : { ...todo, isShown: true }
        )
      );
    } else if (filterCriteria === "completed") {
      setTodos((todos) =>
        todos.map((todo) =>
          !todo.isCompleted
            ? { ...todo, isShown: false }
            : { ...todo, isShown: true }
        )
      );
    } else {
      setTodos((todos) =>
        todos.map((todo) => {
          return { ...todo, isShown: true };
        })
      );
    }
  }

  function handleClearCompleted() {
    setTodos((todos) => todos.filter((todo) => !todo.isCompleted));
  }

  function handleDeleteTodo(id) {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  }
  return (
    <div className={`w-full h-screen  ${colorTheme === "dark" ? "dark" : ""} `}>
      <div className="bg-mobile-light w-full h-screen bg-no-repeat sm:bg-desktop-light text-[18px] md:bg-contain p-4 dark:bg-mobile-dark dark:sm:bg-desktop-dark dark:bg-very-dark-blue">
        <div className="container mx-auto ">
          <Header
            onAddTodo={handleAddTodo}
            colorTheme={colorTheme}
            setColorTheme={setColorTheme}
          />
          <div className="md:shadow-2xl md:shadow-very-light-grayish-blue md:max-w-4xl md:mx-auto md:rounded-b-lg dark:shadow-very-dark-grayish-blue-1">
            <Todos
              todos={todos}
              handleCompleteTodo={handleCompleteTodo}
              onClearCompleted={handleClearCompleted}
              onDeleteTodo={handleDeleteTodo}
            />
            <TodoCategories onFilterTodos={handleFilterTodos} />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
