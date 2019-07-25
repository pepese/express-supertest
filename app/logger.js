'use strict';

const winston = require('winston');
const httpContext = require('express-http-context');

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

const getLogger = () => {
  let logger = httpContext.get('logger');
  if (!logger) {
    const logKeys = httpContext.get('log-keys');
    if (logKeys) {
      const additionalLog = {};
      for ( let key of logKeys ) {
        const value = httpContext.get(key);
        if (value) {
          additionalLog[key] = value;
        }
      }
      logger = winstonLogger.child(additionalLog);
      httpContext.set('logger');
      return logger;
    } else {
      return winstonLogger;
    }
  } else {
    return logger;
  }
}

exports.log = (...args) => {
  const logger = getLogger();
  logger.log(args);
}
exports.fatal = (...args) => {
  const logger = getLogger();
  logger.fatal(args);
}
exports.error = (...args) => {
  const logger = getLogger();
  logger.error(args);
}
exports.warn = (...args) => {
  const logger = getLogger();
  logger.warn(args);
}
exports.info = (...args) => {
  const logger = getLogger();
  logger.info(args);
}
exports.debug = (...args) => {
  const logger = getLogger();
  logger.debug(args);
}
exports.trace = (...args) => {
  const logger = getLogger();
  logger.trace(args);
}
