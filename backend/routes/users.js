const router = require("express").Router();
const usersController = require("../controllers/users");

router
  .get("/", usersController.getAllUsers)
  .post("/register", usersController.register)
  .post("/login", usersController.login);

module.exports = router;