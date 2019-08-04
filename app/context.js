'use strict';

const httpContext = require('express-http-context');
const uuid = require('uuid');
const config = require('./config');

class Context {
  static middleware(req, res, next) {
    httpContext.middleware(req, res, next);
  }

  static init(req, res, next) {
    // req/res 紐付け
    httpContext.ns.bindEmitter(req);
    httpContext.ns.bindEmitter(res);
    // 値のセット
    let reqId;
    if (req.header('X-Request-Id')) {
      reqId = req.header('X-Request-Id');
    } else if (req.header('X-Amzn-Trace-Id')) {
      reqId = req.header('X-Amzn-Trace-Id');
    } else {
      reqId = uuid.v4();
    }
    httpContext.set('reqId', reqId);
    httpContext.set('app', config.APP_NAME);
    httpContext.set('version', config.APP_VERSION);
    // ロガーに追加情報を教える key
    httpContext.set('log-keys', ['reqId', 'app', 'version']);
    next();
  }

  static ns() {
    return httpContext.ns;
  }

  static set(key, value) {
    httpContext.set(key, value);
  }

  static get(key) {
    return httpContext.get(key);
  }
}

module.exports = Context;
