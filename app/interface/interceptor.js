'use strict';

const ContextRepository = require('../infrastructure/datastore/local/context-repo-impl');
const onHeaders = require('on-headers');
const onFinished = require('on-finished');
const logger = require('../logger');

class Interceptor {
  static accessLogging(req, res, next) {
    onHeaders(res, () => {
      ContextRepository.set('startAt', process.hrtime());
    });
    onFinished(res, () => {
      const startAt = ContextRepository.get('startAt');
      const responseTime = '';
      //logger.in
    });
    next();
  }
}

module.exports = Interceptor;
