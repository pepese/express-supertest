"use strict";

const express = require("express");
const router = express.Router();
const user = require("../usecase/user");

router.get("/user", async (req, res) => {
  const id = req.query.id;
  const result = await user.getUser(id);
  res.json(result);
});
router.put("/user", async (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const result = await user.putUser(id, name);
  res.json(result);
});

module.exports = router;
