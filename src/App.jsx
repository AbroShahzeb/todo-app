import { useEffect, useRef, useState } from "react";

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

function Todos({ todos, handleCompleteTodo, onClearCompleted, onDeleteTodo }) {
  const todosLeftCount = todos.filter((todo) => !todo.isCompleted).length;

  return (
    <div className="flex flex-col mt-5 py-4 bg-white rounded-lg shadow-lg shadow-very-light-grayish-blue md:max-w-4xl mx-auto md:shadow-none md:rounded-b-none dark:bg-very-dark-desaturated-blue dark:shadow-very-dark-grayish-blue-1">
      {todos.length ? (
        todos.map((todo) => {
          if (todo.isShown) {
            return (
              <Todo
                todo={todo}
                key={todo.id}
                onCompleteTodo={handleCompleteTodo}
                onDeleteTodo={onDeleteTodo}
              />
            );
          }
        })
      ) : (
        <p className="w-full my-8 text-center">Start Adding Todos</p>
      )}
      <TodosStatus
        todosCount={todosLeftCount}
        onClearCompleted={onClearCompleted}
      />
    </div>
  );
}

function Todo({ todo, onCompleteTodo, onDeleteTodo }) {
  return (
    <div className="p-4 flex items-center border-b-[1px] gap-4 ">
      <div
        className={`py-2 flex items-center justify-center px-[7px] rounded-full border-[1px] border-light-grayish-blue ${
          todo.isCompleted
            ? "bg-gradient-to-br from-gradient-start to-gradient-end border-none"
            : ""
        } dark:border-very-dark-grayish-blue-1`}
        role="button"
        onClick={() => onCompleteTodo(todo.id)}
      >
        <img
          src="/images/icon-check.svg"
          alt="Check Icon"
          className={`${todo.isCompleted ? "opacity-100" : "opacity-0"}`}
        />
      </div>
      <h2
        className={`mr-auto text-sm md:text-lg cursor-pointer ${
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
  );
}

function TodosStatus({ todosCount, onClearCompleted }) {
  return (
    <div className="flex justify-between p-4 py-5 pb-0 text-dark-grayish-blue text-sm font-medium ">
      <p>{todosCount} items left</p>
      <button onClick={onClearCompleted}>Clear Completed</button>
    </div>
  );
}

function TodoCategories({ onFilterTodos }) {
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

function Header({ onAddTodo, colorTheme, setColorTheme }) {
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
    if (e.code === "Enter") {
      onAddTodo(title);
      setTitle("");
    }
  }

  return (
    <header className="flex flex-col gap-8 pt-10 md:max-w-4xl mx-auto">
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
      <div className="bg-white flex items-center rounded-lg dark:bg-very-dark-desaturated-blue">
        <div className="w-6 h-5 border-[1px] border-light-grayish-blue rounded-full mr-4 m-3 mx-6 "></div>
        <input
          type="text"
          placeholder="Create a new todo..."
          className="placeholder:leading-none text-lg h-full w-full p-4 px-0 bg-transparent focus:outline-none mt-1 dark:placeholder:text-dark-grayish-blue dark:text-light-grayish-blue"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          ref={inputRef}
          onKeyDown={(e) => createTodo(e)}
        />
      </div>
    </header>
  );
}

function Footer() {
  return (
    <p className="text-center mt-10 text-md text-dark-grayish-blue pb-10">
      Drag and Drop to reorder list
    </p>
  );
}

export default App;
