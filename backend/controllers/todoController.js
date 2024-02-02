const {
  getTodosFromDB,
  addNewTodoToUser,
  saveNewTodosInUser,
  deleteTodoFromUser,
  updateTodoInDB,
} = require("../services/todo-service.js");

exports.getAllTodos = async (req, res) => {
  try {
    const userTodos = req.user.todos;
    // get the todos present in user
    const allTodos = await getTodosFromDB(userTodos);

    res.status(200).json(allTodos);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const user = req.user;
    const newTodo = await addNewTodoToUser(user, req.body);
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

exports.saveAllTodos = async (req, res) => {
  try {
    // get all todos from req.body
    const todosToSave = req.body.todos;
    const savedTodos = await saveNewTodosInUser(req.user, todosToSave);
    if (savedTodos === null) {
      return res.status(200).json({ status: "fail", message: "No new todos to save" });
    }
    res.status(201).json({ status: "success", savedTodos });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    // delete todo from db and return it.
    const todo = await deleteTodoFromUser(todoId, req.user);
    res.status(200).json(todo);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const todo = await updateTodoInDB(req.params.id);
    res.status(200).json({ status: "success", todo });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
