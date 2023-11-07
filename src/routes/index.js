const { Router } = require("express");

const usersRouter = require("./userRoutes");
const isAuthenticated = require("../http/middlewares/isAuthenticated");
const classesRouter = require("./classesRouter");

const routes = Router();

routes.use(usersRouter);
routes.use(isAuthenticated);
routes.use(classesRouter);

module.exports = routes;
