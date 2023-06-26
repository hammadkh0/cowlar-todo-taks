const express = require("express");
const {
  getAllTodos,
  createTodo,
  saveAllTodos,
  deleteTodo,
  updateTodo,
  protect,
} = require("./todoController");
// const { protect } = require("../user-service/userController");

const router = express.Router();

router.use(protect);
router.get("/", getAllTodos);
router.post("/", createTodo);
router.post("/saveAll", saveAllTodos);
router.delete("/:id", deleteTodo);
router.patch("/:id", updateTodo);
module.exports = router;
