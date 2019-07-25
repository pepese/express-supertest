'use strict';

const express = require('express');
const httpContext = require('express-http-context');
const uuid = require('uuid');
const router = require('../../interface/router');
const helmet = require('helmet');
const logger = require('../../logger');
const config = require('../../config');

const app = express();
app.use(httpContext.middleware);
// コンテキストに reqId などをセット
app.use((req, res, next) => {
  // req/res 紐付け
  httpContext.ns.bindEmitter(req);
  httpContext.ns.bindEmitter(res);
  // 値のセット
  httpContext.set('reqId', uuid.v4());
  httpContext.set('app', config.APP_NAME);
  httpContext.set('version', config.APP_VERSION);
  // ロガーに追加情報を教える key
  httpContext.set('log-keys', ['reqId', 'app','version'])
  next();
});
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(helmet());
app.use('/', router);
// 500
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res
    .status(500)
    .json({message: 'Internal Server Error.'})
    .end();
});
// 404
app.use((req, res, next) => {
  res
    .status(404)
    .json({message: 'Not Found.'})
    .end();
});
app.set('port', '3000');

module.exports = app;
