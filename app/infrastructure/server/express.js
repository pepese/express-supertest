"use strict";

const express = require("express");
const app = express();
const router = require("../../interface/router");
const bodyParser = require("body-parser");
const helmet = require("helmet");

app.use(bodyParser.json());
app.use(helmet());
app.use("/", router);
app.use((req, res) => {
  res.status(404);
  res.json({ message: "Not Found." });
});
app.set("port", "3000");

module.exports = app;
