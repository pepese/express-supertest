'use strict';

const ContextRepository = require('../infrastructure/datastore/local/context-repo-impl');
const logger = require('../logger');

class EchoUsecase {
  static echo() {
    logger.info('Echo called.');
    return {
      'app': ContextRepository.get('app'),
      'version': ContextRepository.get('version'),
    }
  }
}

module.exports = EchoUsecase;
