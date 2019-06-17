"use strict";

const express = require("express");
const router = express.Router();
const user = require("../usecase/user");
const token = require("../usecase/token");
const pdf= require("../usecase/pdf");

router.post("/auth", (req, res) => {
  const id = req.body.id;
  const password = req.body.password;
  res.json({ token: token.auth(id, password) });
});
router.get("/user", token.verifyToken);
router.get("/user", async (req, res) => {
  const id = req.query.id;
  const result = await user.getUser(id);
  res.json(result);
});
router.put("/user", token.verifyToken);
router.put("/user", async (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const result = await user.putUser(id, name);
  res.json(result);
});
router.get("pdf", async (req, rest) => {
  const result = await pdf.getPdf();
  res.send(result);
});

module.exports = router;
