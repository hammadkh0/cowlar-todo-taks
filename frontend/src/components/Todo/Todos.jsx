import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import TodoItem from "./TodoItem";
import TodoInput from "./TodoInput";
import {
  addTodoInDB,
  addTodoLocally,
  deleteTodoInDB,
  deleteTodoOnClient,
  fetchAllTodos,
  logout,
  saveTodosToDB,
  updateTodoInDB,
  updateTodoOnClient,
} from "../../services/todoApi";

// eslint-disable-next-line react/prop-types
function Todos() {
  const inputRef = useRef(null);
  const [Todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const VITE_TODO_SERVICE_URL = import.meta.env.VITE_TODO_SERVICE_URL || "http://localhost:5001";

  const isLoggedIn = !!localStorage.getItem("jwt");
  /**
   * double bang (!!) converts the value to boolean.
   * if the localStorage has jwt then isLoggedIn will be converted to true else false.
   */
  const localTodos = JSON.parse(localStorage.getItem("saveLater"))?.map((todo) => todo.id) || [];

  const image =
    JSON.parse(localStorage.getItem("user"))?.image ||
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Pablo_Escobar_Mug.jpg/1200px-Pablo_Escobar_Mug.jpg";
  // get logged user image or a default image

  useEffect(() => {
    async function fetchTodos() {
      const todos = JSON.parse(localStorage.getItem("saveLater")) || [];
      const jwt = localStorage.getItem("jwt");
      if (!jwt) {
        setTodos(todos);
      } else {
        const allTodos = await fetchAllTodos(VITE_TODO_SERVICE_URL, jwt, todos);
        setTodos(allTodos);
      }
    }

    fetchTodos();

    return () => {
      setTodos([]);
    };
  }, [VITE_TODO_SERVICE_URL]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // If input is empty return.
    if (!inputRef.current.value) {
      setLoading(false);
      return;
    }

    if (!isLoggedIn) {
      const createdTodo = addTodoLocally(Todos, inputRef);

      setTodos(createdTodo);
      setLoading(false);
      inputRef.current.value = "";
    } else {
      const createdTodo = await addTodoInDB(VITE_TODO_SERVICE_URL, inputRef);

      if (createdTodo !== null) {
        setTodos([...Todos, createdTodo]);
      }
      setLoading(false);
      inputRef.current.value = "";
    }
  };

  const deleteTodo = async (id) => {
    if (isLoggedIn && !localTodos.includes(id)) {
      await deleteTodoInDB(VITE_TODO_SERVICE_URL, id);
    }
    const newTodos = deleteTodoOnClient(Todos, id, localTodos);
    setTodos(newTodos);
  };

  const handleCompletion = async (id) => {
    if (isLoggedIn && !localTodos.includes(id)) {
      // if user is logged in, then update todo on backend.
      const isUpdated = await updateTodoInDB(VITE_TODO_SERVICE_URL, id);

      if (!isUpdated) return;
    }
    const { didTodoComplete, newTodos } = updateTodoOnClient(Todos, id, localTodos);
    setTodos(newTodos);

    return didTodoComplete;
  };

  return (
    <>
      <ToastContainer />
      {!isLoggedIn && (
        <p>
          <span className="text-red-500 cursor-pointer" onClick={() => navigate("/login")}>
            Login
          </span>{" "}
          or{" "}
          <span className="text-white cursor-pointer" onClick={() => navigate("/signup")}>
            Signup
          </span>{" "}
          to Save Todos
        </p>
      )}
      <div>
        <img
          src={image}
          alt="profile"
          className="h-[100px] w-[100px] rounded-[50%] object-cover m-auto"
        />
      </div>
      {isLoggedIn ? (
        <div>
          <button
            className="button bg-[#13a53f] text-white mr-4 p-[10px]"
            onClick={() => {
              saveTodosToDB(Todos, VITE_TODO_SERVICE_URL, setIsSaving);
            }}
          >
            {isSaving ? "Saving" : "Save"} Todos to Database
          </button>
          <button className="button bg-[#cf1f1f] text-white w-[70px] p-[10px]" onClick={logout}>
            Logout
          </button>
        </div>
      ) : (
        <> </>
      )}
      <div className="w-2/5 my-0 mx-auto overflow-y-scroll max-h-[52vh] rounded-tl-lg rounded-bl-lg">
        {Todos.map((todo, idx) => (
          <TodoItem key={idx} todo={todo} deleteTodo={deleteTodo} onComplete={handleCompletion} />
        ))}
      </div>

      <TodoInput handleSubmit={handleSubmit} inputRef={inputRef} loading={loading} />
    </>
  );
}

export default Todos;
