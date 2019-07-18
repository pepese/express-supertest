'use strict';

const logger = require('../logger');
const context = require('express-http-context');
const ContextRepository = require('../infrastructure/datastore/local/context-repo-impl');

describe('app/logger.js', () => {
  test('info string', () => {
    context.ns.run(() => function(){
      ContextRepository.set('reqId', 'testId');
      logger.info('hoge');
    }());
  });
  test('info object', () => {
    logger.info({
      column1: 'hoge',
      column2: 'fuge'
    });
  });
});
