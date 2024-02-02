const Todo = require("../models/todoModel.js");

exports.getTodosFromDB = async (userTodos) => {
  const todosFromDB = await Todo.find({ _id: { $in: userTodos } });
  return todosFromDB;
};

exports.addNewTodoToUser = async (user, body) => {
  const newTodo = await Todo.create(body);
  // populate user with todos
  user.todos = [...user.todos, newTodo];
  await user.save();
  return newTodo;
};

exports.saveNewTodosInUser = async (user, todosToSave) => {
  // get all the user's todos from db and filter out only their titles
  let userTodos = await user.populate("todos");
  userTodos = userTodos.todos.map((todo) => todo.title);
  // filter out only the todos that are not in the user's todos
  const uniqueTodos = todosToSave.filter((todo) => !userTodos.includes(todo.title));
  if (uniqueTodos.length === 0) {
    return null;
  }
  const savedTodos = await Todo.insertMany(uniqueTodos);
  // populate user with the new todos
  user.todos = [...user.todos, ...savedTodos];
  await user.save();

  return savedTodos;
};

exports.deleteTodoFromUser = async (todoId, user) => {
  const todo = await Todo.findByIdAndDelete(todoId);
  user.todos = user.todos.filter((todo) => todo._id.toString() !== todoId);
  await user.save();

  return todo;
};

exports.updateTodoInDB = async (id) => {
  const todo = await Todo.findById(id);
  todo.completed = !todo.completed;
  todo.completedAt = todo.completed ? new Date().toISOString() : null;
  await todo.save();

  return todo;
};
