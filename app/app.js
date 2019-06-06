"use strict";

const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
// ボディのURLエンコード
//app.use(bodyParser.urlencoded({ extended: false }));

const router = express.Router();
router.get("/", (req, res) => {
  res.json({
    message: "Hello, World !"
  });
});
router.post("/", (req, res) => {
  console.log("body: %s", req.body);
  res.json({
    message: "POST!"
  });
});
app.use("/", router);
app.set("port", "3000");
module.exports = app;

/**
 * HTTP server作成
 */
if (!module.parent) {
  const server = http.createServer(app);
  // listenポートを指定してHTTP serverを起動
  server.listen("3000", () => console.log(`API running on localhost:3000`));
}
