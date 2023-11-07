const { Router } = require("express");
const {
  createClassController,
} = require("../http/controller/classesController");

const classesRouter = Router();

classesRouter.post("/class", createClassController);

module.exports = classesRouter;
