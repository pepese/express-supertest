"use strict";

const express = require("express");
const app = express();
const router = require("../../interface/router");
const helmet = require("helmet");
const logger = require("../../logger");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use("/", router);
// 500
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ message: "Internal Server Error." }).end();
});
// 404
app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found." }).end();
});
app.set("port", "3000");

module.exports = app;
