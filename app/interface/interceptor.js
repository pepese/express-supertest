'use strict';

// const httpContext = require('express-http-context');
const ContextRepository = require('../infrastructure/datastore/local/context-repo-impl');
const uuid = require('uuid');
// const logger = require('../logger');

class Interceptor {
  static init(req, res, next) {
  // const init = (req, res, next) => {
    // httpContext.ns.bindEmitter(req);
    // httpContext.ns.bindEmitter(res);
    // httpContext.set('reqId', uuid.v4()+'@Interceptor');
    console.log('@intercepter reqId is %s .', ContextRepository.get('reqId'));
    // logger.init();
    ContextRepository.set('reqId', uuid.v4()+'@Interceptor');
    next();
  }
}

module.exports = Interceptor;
// module.exports = {
//   init: init,
// }
