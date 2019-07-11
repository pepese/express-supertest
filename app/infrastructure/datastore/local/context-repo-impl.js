'use strict';

const ContextRepository = require('../../../usecase/repository/context-repo');
const httpContext = require('express-http-context');

class ContextRepositoryImpl extends ContextRepository {
  // override
  static set(key, value) {
    httpContext.set(key, value);
  }
  // override
  static get(key) {
    return httpContext.get(key);
  }
}

module.exports = ContextRepositoryImpl;
