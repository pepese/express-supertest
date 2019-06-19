"use strict";

const TokenDomain = require("../domain/token-domain");

const auth = (id, password) => {
  // TODO: MUST check id and password.
  return TokenDomain.createJWT({ id: id, password: password });
};

const verifyJWT = (req, res, next) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      const result = TokenDomain.verifyJWT(req.headers.authorization.split(" ")[1]);
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
  verifyJWT: verifyJWT
};
