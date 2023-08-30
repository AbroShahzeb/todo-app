import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Todos from "./components/Todos";
import TodoCategories from "./components/TodoCategories";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";

const initialTodos = [
  {
    id: 1,
    title: "Complete online JavaScript course",
    isCompleted: true,
    isShown: true,
  },
  {
    id: 2,
    title: "Jog around the park 3x",
    isCompleted: false,
    isShown: true,
  },
  {
    id: 3,
    title: "10 minutes meditation",
    isCompleted: false,
    isShown: true,
  },
  {
    id: 4,
    title: "Read for 1 hour",
    isCompleted: false,
    isShown: true,
  },
  {
    id: 5,
    title: "Pickup groceries",
    isCompleted: false,
    isShown: true,
  },
  {
    id: 6,
    title: "Complete Todo App on Frontend Mentor",
    isCompleted: false,
    isShown: true,
  },
];

function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [colorTheme, setColorTheme] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(function () {
    let theme = localStorage.getItem("theme");
    if (!theme) localStorage.setItem("theme", "dark");
    setColorTheme(theme);
  }, []);

  useEffect(function () {
    let todos = localStorage.getItem("todos");
    if (todos) {
      setTodos(JSON.parse(todos));
    }
  }, []);

  function handleAddTodo(title) {
    const newTodo = {
      id: crypto.randomUUID(),
      title: title,
      isCompleted: false,
      isShown: true,
    };

    if (!title) return;
    setTodos((todos) => {
      let newTodos = [newTodo, ...todos];
      localStorage.setItem("todos", JSON.stringify(newTodos));

      return newTodos;
    });
  }

  function handleCompleteTodo(id) {
    setTodos((todos) => {
      let newTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo,
      );
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    });
  }

  function handleFilterTodos(filterCriteria) {
    if (filterCriteria === "active") {
      setFilter("active");
      setTodos((todos) => {
        return todos.map((todo) =>
          todo.isCompleted
            ? { ...todo, isShown: false }
            : { ...todo, isShown: true },
        );
      });
    } else if (filterCriteria === "completed") {
      setFilter("completed");
      setTodos((todos) => {
        return todos.map((todo) =>
          !todo.isCompleted
            ? { ...todo, isShown: false }
            : { ...todo, isShown: true },
        );
      });
    } else {
      setFilter("all");
      setTodos((todos) => {
        return todos.map((todo) => {
          return { ...todo, isShown: true };
        });
      });
    }
  }

  function handleClearCompleted() {
    setTodos((todos) => {
      let newTodos = todos.filter((todo) => !todo.isCompleted);
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    });
  }

  function handleDeleteTodo(id) {
    setTodos((todos) => {
      let newTodos = todos.filter((todo) => todo.id !== id);
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    });
  }

  return (
    <DndProvider backend={TouchBackend}>
      <div
        className={`w-full h-screen  ${colorTheme === "dark" ? "dark" : ""} `}
      >
        <div className="bg-mobile-light w-full min-h-screen bg-no-repeat sm:bg-desktop-light text-[18px] md:bg-contain p-4 dark:bg-mobile-dark dark:sm:bg-desktop-dark dark:bg-very-dark-blue">
          <div className="container mx-auto ">
            <Header
              onAddTodo={handleAddTodo}
              colorTheme={colorTheme}
              setColorTheme={setColorTheme}
            />
            <div className="md:shadow-2xl md:shadow-very-light-grayish-blue md:max-w-[33rem] md:mx-auto md:rounded-b-lg relative dark:shadow-very-dark-grayish-blue-1 dark:shadow-none">
              <Todos
                todos={todos}
                handleCompleteTodo={handleCompleteTodo}
                onClearCompleted={handleClearCompleted}
                onDeleteTodo={handleDeleteTodo}
                setTodos={setTodos}
                handleFilterTodos={handleFilterTodos}
                filter={filter}
              />
              <TodoCategories onFilterTodos={handleFilterTodos} />
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
