const express = require("express");
const {
  addTodoController,
  updatedTodoController,
  getTodosController,
  deleteTodoController,
} = require("./todo.controllers");
const authorizeUser = require("../../middleware/jwtAuth");
const router = express.Router();

router.post("/todo/addTodo", authorizeUser, addTodoController);
router.patch("/todo/updateTodo/:id", authorizeUser, updatedTodoController);
router.get("/todo/getTodos", authorizeUser, getTodosController);
router.delete("/todo/delete/:id", authorizeUser, deleteTodoController);

module.exports = router;
