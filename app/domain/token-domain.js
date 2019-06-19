"use strict";

const jwt = require("jsonwebtoken");
const speakeasy = require("speakeasy");
const secret = "secret";

class Token {
  constructor() {}
  static createJWT(payload) {
    payload.exp = Math.floor(Date.now() / 1000) + 24 * 60 * 60;
    return jwt.sign(payload, secret);
  }
  static verifyJWT(token) {
    try {
      return jwt.verify(token, secret);
    } catch (e) {
      throw e;
    }
  }
  static createTOTP() {
    return speakeasy.totp({
      secret: secret,
      //encoding: "base32",
      time: 3
    });
  }
  static verifyTOTP(token) {
    return speakeasy.totp.verify({
      secret: secret,
      //encoding: "base32",
      time: 3,
      token: token
    });
  }
}

module.exports = Token;
