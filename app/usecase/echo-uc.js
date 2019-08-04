'use strict';

const context = require('../context');
const logger = require('../logger');

class EchoUsecase {
  static echo() {
    logger.info('Echo called.');
    return {
      app: context.get('app'),
      version: context.get('version'),
    };
  }
}

module.exports = EchoUsecase;
