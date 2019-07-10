'use strict';

const jwt = require('jsonwebtoken');
const notp = require('notp');
const config = require('../config');

class Token {
  constructor() {}
  static createJWT(payload) {
    payload.exp = Math.floor(Date.now() / 1000) + 24 * 60 * 60;
    return jwt.sign(payload, config.SECRET);
  }
  static verifyJWT(token) {
    try {
      return jwt.verify(token, config.SECRET);
    } catch (e) {
      throw e;
    }
  }
  static createTOTP() {
    return notp.totp.gen(config.SECRET, {time: config.TOTP_TTL});
  }
  static verifyTOTP(token) {
    try {
      return notp.totp.verify(token, config.SECRET);
    } catch (e) {
      throw e;
    }
  }
}

module.exports = Token;
