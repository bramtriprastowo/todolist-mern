const router = require("express").Router();
const todosController = require("../controllers/todos");

router
  .get("/", todosController.getAllTodos)
  .post("/", todosController.insertTodo)
  .put("/", todosController.updateTodo)
  .delete("/:id", todosController.deleteTodo);

module.exports = router;