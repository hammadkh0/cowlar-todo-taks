import { toastError, toastSuccess } from "../utils/toastMessages";

export async function fetchAllTodos(url, jwt, todos) {
  try {
    const res = await fetch(`${url}/api/v1/todos`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    const data = await res.json();

    return [...data, ...todos];
  } catch (err) {
    toastError(err);
    return [];
  }
}

export function addTodoLocally(Todos, inputRef) {
  const updatedTodos = [
    ...Todos,
    {
      id: Todos.length ? Todos[Todos.length - 1].id + 1 : 1, //get last element id and add 1 to it.
      title: inputRef.current.value,
      completed: false,
      createdAt: new Date(),
    },
  ];
  localStorage.setItem("saveLater", JSON.stringify(updatedTodos));
  return updatedTodos;
}

export async function addTodoInDB(url, inputRef) {
  try {
    const res = await fetch(`${url}/api/v1/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({ title: inputRef.current.value }),
    });

    const data = await res.json();
    return data;
  } catch (err) {
    toastError(err.message);
    return null;
  }
}

export function deleteTodoOnClient(Todos, id, localTodos) {
  const newTodos = Todos.filter((todo) => todo.id !== id);
  localStorage.setItem(
    "saveLater",
    JSON.stringify(newTodos.filter((todo) => localTodos.includes(todo.id)))
  );
  return newTodos;
}
export async function deleteTodoInDB(url, id) {
  try {
    fetch(`${url}/api/v1/todos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    return true;
  } catch (err) {
    toastError(err.message);
    return false;
  }
}

export function updateTodoOnClient(Todos, id, localTodos) {
  // to check if the todo is completed or is set to incomplete
  let didTodoComplete = true;

  // update todo on client side as well.
  const newTodos = Todos.map((todo) => {
    if (todo.id === id) {
      if (todo.completed) {
        // if todo was completed, this means it will become incomplete so set the variable to False.
        didTodoComplete = false;
      }
      return {
        ...todo,
        completedAt: todo.completed ? undefined : new Date(),
        completed: !todo.completed,
      };
    }
    return todo;
  });

  // only update the todos in localStorage if no user exists. Otherwise only db updation is considered
  localStorage.setItem(
    "saveLater",
    JSON.stringify(newTodos.filter((todo) => localTodos.includes(todo.id)))
  );
  // return boolean value to check if todo was completed or not.
  return { didTodoComplete, newTodos };
}
export async function updateTodoInDB(url, id) {
  try {
    const res = await fetch(`${url}/api/v1/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    if (!res.ok) {
      toastError("Something went wrong! Please try again.");
      return false;
    }
    return true;
  } catch (err) {
    toastError("Something went wrong! Please try again.");
    return false;
  }
}

export async function saveTodosToDB(Todos, url, setIsSaving) {
  setIsSaving(true);
  // 1. Remove the integer id from the locally saved todos.
  const todosToSave = Todos.map((todo) => ({ ...todo, id: undefined }));
  // 2. Send the todos to backend to save them.
  const res = await fetch(`${url}/api/v1/todos/saveAll`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({ todos: todosToSave }),
    mode: "cors",
  });
  const data = await res.json();

  if (data.status === "fail") {
    toastError(data.message);
    setIsSaving(false);
    return;
  }
  // 3. Clear the todos from localStorage.
  localStorage.setItem("saveLater", JSON.stringify([]));
  toastSuccess("Todos saved successfully!");
  setIsSaving(false);
}

export function logout() {
  localStorage.removeItem("jwt");
  localStorage.removeItem("user");
  // refresh page to update navbar
  window.location.reload();
}
