"use strict";

const express = require("express");
const router = express.Router();
const userUC = require("../usecase/user-uc");
const tokenUC = require("../usecase/token-uc");
const pdfUC= require("../usecase/pdf-uc");

router.post("/auth", (req, res) => {
  const id = req.body.id;
  const password = req.body.password;
  // コンテンツネゴシエーション（アクセプトヘッダを見て分岐）
  res.format({
    "application/json": () => {
      res.json({ token: tokenUC.auth(id, password) });
    },
    "default": () => {
      res.status(406).send(body406);
    }
  });
});
router.get("/user", tokenUC.verifyJWT);
router.get("/user", async (req, res) => {
  const id = req.query.id;
  const result = await userUC.getUser(id);
  res.format({
    "application/json": () => {
      res.json(result);
    },
    "default": () => {
      res.status(406).send(body406);
    }
  });
});
router.put("/user", tokenUC.verifyJWT);
router.put("/user", async (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const result = await userUC.putUser(id, name);
  res.format({
    "application/json": () => {
      res.json(result);
    },
    "default": () => {
      res.status(406).send(body406);
    }
  });
});
router.get("pdf", async (req, rest) => {
  const result = await pdfUC.getPdf();
  res.send(result);
});

const body406 = {
  message: "Not Acceptable"
}

module.exports = router;
