'use strict';

const jwt = require('jsonwebtoken');
const notp = require('notp');
const config = require('../config');
const logger = require('../logger');
const boom = require('boom');

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
      if (boom.isBoom(e)) {
        throw e;
      } else {
        logger.warn(e.stack);
        throw boom.unauthorized(e);
      }
    }
  }

  static createTOTP() {
    const time = Math.floor(new Date().getTime() / 1000) + config.TOTP_TTL;
    return {token: notp.totp.gen(config.SECRET, {time: time}), time: time};
  }

  static verifyTOTP(token, time) {
    const result = notp.totp.verify(token, config.SECRET, {
      time: time,
      window: 0,
    });
    return result != null && result.delta >= 0;
  }
}

module.exports = Token;
