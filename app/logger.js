'use strict';

const winston = require('winston');
const context = require('./context');

const winstonLogger = winston.createLogger({
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5,
  },
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()],
});

module.exports = class Logger {
  static log(...args) {
    const logger = this._getLogger();
    logger.log(args);
  }
  static fatal(...args) {
    const logger = this._getLogger();
    logger.fatal(args);
  }
  static error(...args) {
    const logger = this._getLogger();
    logger.error(args);
  }
  static warn(...args) {
    const logger = this._getLogger();
    logger.warn(args);
  }
  static info(...args) {
    const logger = this._getLogger();
    logger.info(args);
  }
  static debug(...args) {
    const logger = this._getLogger();
    logger.debug(args);
  }
  static trace(...args) {
    const logger = this._getLogger();
    logger.trace(args);
  }

  ////////////////////////
  // private functions
  ////////////////////////

  static _getLogger() {
    const logKeys = context.get('log-keys');
    const addLogs = {};
    if (logKeys) {
      for (let key of logKeys) {
        const value = context.get(key);
        if (value) {
          addLogs[key] = value;
        }
      }
      return winstonLogger.child(addLogs);
    } else {
      return winstonLogger;
    }
  }
};
