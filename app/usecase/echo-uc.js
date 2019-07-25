'use strict';

const ContextRepository = require('../infrastructure/datastore/local/context-repo-impl');
const logger = require('../logger');

class EchoUsecase {
  static echo() {
    logger.info('Echo called.');
    logger.info(`ContextRepository.get("reqId"): ${ContextRepository.get('reqId')}`);
    return {
      'app': ContextRepository.get('app'),
      'version': ContextRepository.get('version'),
    }
  }
}

module.exports = EchoUsecase;
