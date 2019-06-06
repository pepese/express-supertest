"use strict";

const express = require("express");
const app = express();
const router = express.Router();
const http = require("http");
const bodyParser = require("body-parser");
const helmet = require("helmet");

router.get("/", async (req, res) => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // something to process
  res.json({
    message: "GET called !"
  });
});
router.post("/", async (req, res) => {
  console.log("body: %s", req.body);
  await new Promise(resolve => setTimeout(resolve, 1000)); // something to process
  res.json({
    message: "POST called !"
  });
});

app.use(bodyParser.json());
app.use(helmet());
app.use("/", router);
app.set("port", "3000");
module.exports = app;

if (!module.parent) {
  const server = http.createServer(app);
  // listenポートを指定してHTTP serverを起動
  server.listen("3000", () => console.log(`API running on localhost:3000`));
}
