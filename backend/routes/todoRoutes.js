import express from "express";
import {
  getAllTodos,
  createTodo,
  saveAllTodos,
  deleteTodo,
  updateTodo,
} from "../controllers/todoController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.get("/", getAllTodos);
router.post("/", createTodo);
router.post("/saveAll", saveAllTodos);
router.delete("/:id", deleteTodo);
router.patch("/:id", updateTodo);

export default router;
