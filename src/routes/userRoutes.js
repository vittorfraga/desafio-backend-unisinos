const { Router } = require("express");
const {
  createUserController,
  createUserSessionController,
} = require("../http/controller/userController");

const usersRouter = Router();

usersRouter.post("/user", createUserController);
usersRouter.post("/user/login", createUserSessionController);

module.exports = usersRouter;
