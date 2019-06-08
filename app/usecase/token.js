"use strict";

const Token = require("../domain/token");
const token = new Token();

const auth = (id, password) => {
  // MUST check id and password.
  return token.create({ id: id, password: password });
};

const verifyToken = (req, res, next) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      const result = token.verify(req.headers.authorization.split(" ")[1]);
      if (result != null) {
        res.locals.id = result.id;
        next();
      }
    }
  } catch (e) {
    res.status(401);
  }
};

module.exports = {
  auth: auth,
  verifyToken: verifyToken
};
