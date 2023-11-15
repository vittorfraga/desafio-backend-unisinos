const { Router } = require("express");
const {
  createClassController,
  listAllClassesController,
  listClassesByTeacherIdController,
  listClassesByStudentIdController,
  listClassByIdController
} = require("../http/controller/classesController");

const isAdmin = require("../http/middlewares/isAdmin");

const classesRouter = Router();

classesRouter.post("/class", isAdmin, createClassController);
classesRouter.get("/class/list", isAdmin, listAllClassesController);
classesRouter.get("/class/list/byTeacherId", isAdmin, listClassesByTeacherIdController);
classesRouter.get("/class/list/byStudentId", isAdmin, listClassesByStudentIdController);
classesRouter.get("/class/list/byClassId", isAdmin, listClassByIdController);



module.exports = classesRouter;
