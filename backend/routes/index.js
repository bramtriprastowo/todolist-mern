const express = require("express");
const router = express.Router();
const todosRouter = require("./todos");
const usersRouter = require("./users");

router
    .use("/todos", todosRouter)
    .use("/users", usersRouter);

module.exports = router