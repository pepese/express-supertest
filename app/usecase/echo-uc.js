'use strict';

const ContextRepository = require('../infrastructure/datastore/local/context-repo-impl');

class EchoUsecase {
  static echo() {
    const logger = require('../logger').getLogger();
    logger.info('Echo called.');
    logger.info(`ContextRepository.get("reqId"): ${ContextRepository.get('reqId')}`);
  }
}

module.exports = EchoUsecase;
