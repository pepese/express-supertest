'use strict';

const express = require('express');
const context = require('../../context');
const router = require('../../interface/router');
const helmet = require('helmet');
const boom = require('boom');
const logger = require('../../logger');
const config = require('../../config');

const app = express();

// コンテキストの設定と初期化
app.use(context.middleware);
app.use(context.init);
// その他ミドルウェアの設定
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(helmet());
// ルーターの設定
app.use('/', router);
// handled error or 500
app.use((err, req, res, next) => {
  let result;
  if (boom.isBoom(err)) {
    // ハンドリング済みのエラーであるか？
    result = err;
  } else {
    logger.error(err.stack);
    result = boom.badImplementation(err);
  }
  res.status(result.output.statusCode).json(result.output.payload);
});
// 404
app.use((req, res, next) => {
  const result = boom.notFound('missing');
  res.status(result.output.statusCode).json(result.output.payload);
});
// Server Port
app.set('port', config.SERVER_PORT);

module.exports = app;
