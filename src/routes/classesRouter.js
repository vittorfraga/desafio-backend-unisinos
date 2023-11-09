const { Router } = require("express");
const {
  createClassController,
} = require("../http/controller/classesController");
const isAdmin = require("../http/middlewares/isAdmin");

const classesRouter = Router();

classesRouter.post("/class", isAdmin, createClassController);

module.exports = classesRouter;
