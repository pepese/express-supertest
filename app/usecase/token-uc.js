"use strict";

const TokenDomain = require("../domain/token-domain");
const token = new TokenDomain();

const auth = (id, password) => {
  // TODO: MUST check id and password.
  return token.create({ id: id, password: password });
};

const verifyToken = (req, res, next) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      const result = token.verify(req.headers.authorization.split(" ")[1]);
      if (result && result.id) {
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
