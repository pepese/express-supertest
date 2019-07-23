'use strict';

const winston = require('winston');
const httpContext = require('express-http-context');

const winstonLogger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()],
});

exports.getLogger = () => {
  let logger = httpContext.get('logger');
  if (!logger) {
    logger = winstonLogger.child({reqId: httpContext.get('reqId')});
    httpContext.set('logger', logger);
  }
  return logger;
};
