/* eslint-disable no-undef */
import mongoose from "mongoose";

import { getAllTodos, deleteTodo } from "../../controllers/todoController";
import Todo from "../../models/todoModel.js";
import { variables } from "../../configs/variables.js";

// Mocking the required models
jest.mock("../../models/todoModel.js");
jest.mock("../../models/userModel.js");

beforeAll(async () => {
  await mongoose.connect(variables.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});
afterAll(async () => {
  await mongoose.connection.close();
});

describe("TodoController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllTodos", () => {
    test("should return all todos for the user", async () => {
      const mockUserTodos = ["todo1", "todo2"];
      Todo.find.mockResolvedValue(mockUserTodos);

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const req = { user: { todos: ["1", "2"] } };

      await getAllTodos(req, mockResponse);

      expect(Todo.find).toHaveBeenCalledWith({ _id: { $in: req.user.todos } });
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockUserTodos);
    });

    test("should return 404 if an error occurs", async () => {
      const mockError = new Error("Database error");
      Todo.find.mockRejectedValue(mockError);

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const req = { user: { todos: ["1", "2"] } };

      await getAllTodos(req, mockResponse);

      expect(Todo.find).toHaveBeenCalledWith({ _id: { $in: req.user.todos } });
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: mockError.message });
    });
  });

  // Add test cases for other methods in a similar manner
  describe("deleteTodo", () => {
    test("should delete a todo and remove it from the user", async () => {
      const mockTodoId = "123456789";
      const mockDeletedTodo = { _id: mockTodoId, title: "Todo 1", completed: false };
      const mockUser = {
        todos: [mockDeletedTodo],
        save: jest.fn(),
      };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const req = { params: { id: mockTodoId }, user: mockUser };

      Todo.findByIdAndDelete.mockResolvedValue(mockDeletedTodo);

      await deleteTodo(req, mockResponse);

      expect(Todo.findByIdAndDelete).toHaveBeenCalledWith(mockTodoId);
      expect(mockUser.todos).toEqual([]);
      expect(mockUser.save).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockDeletedTodo);
    });

    test("should return 404 if the todo is not found", async () => {
      const mockTodoId = "123456789";
      const mockError = new Error("Todo not found");
      Todo.findByIdAndDelete.mockRejectedValue(mockError);

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const req = { params: { id: mockTodoId }, user: { todos: [] } };

      await deleteTodo(req, mockResponse);

      expect(Todo.findByIdAndDelete).toHaveBeenCalledWith(mockTodoId);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: mockError.message });
    });
  });
});
