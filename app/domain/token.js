"use strict";

const jwt = require("jsonwebtoken");
const secret = "secret";

class Token {
  constructor() {}
  create(payload) {
    payload.exp = Math.floor(Date.now() / 1000) + 24 * 60 * 60;
    return jwt.sign(payload, secret);
  }
  verify(token) {
    try {
      return jwt.verify(token, secret);
    } catch (e) {
      throw e;
    }
  }
}

module.exports = Token;
