require("dotenv").config();

const express = require("express");
const routes = require("./routes/index");
const errorHandler = require("./http/middlewares/errorHandler");

const app = express();

app.use(express.json());

app.use(routes);
app.use(errorHandler);

module.exports = app;
