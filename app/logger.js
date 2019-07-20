'use strict';

const winston = require('winston');
const httpContext = require('express-http-context');

const winstonLogger = winston.createLogger({
  levels: {
    error: 0,
    warn: 1,
    verbose: 2,
    info: 3,
    debug: 4,
    silly: 5,
  },
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()],
});

// // Wrap Winston logger to print reqId in each log
// var formatMessage = function(message) {
//   var reqId = httpContext.get('reqId');
//   // if (reqId) {
//   //   message.reqId = reqId;
//   // }
//   // return message;
//   if (reqId) {
//     return {
//       reqId: reqId,
//       message: message
//     };
//   } else {
//     return message;
//   }
// };

// var logger = {
//   log: function(level, message, meta = null) {
//     winstonLogger.log(level, formatMessage(message), meta);
//   },
//   error: function(message) {
//     winstonLogger.error(formatMessage(message));
//   },
//   warn: function(message) {
//     winstonLogger.warn(formatMessage(message));
//   },
//   verbose: function(message) {
//     winstonLogger.verbose(formatMessage(message));
//   },
//   info: function(message) {
//     winstonLogger.info(formatMessage(message));
//   },
//   debug: function(message) {
//     winstonLogger.debug(formatMessage(message));
//   },
//   silly: function(message) {
//     winstonLogger.silly(formatMessage(message));
//   },
// };

exports.getLogger = () => {
  let logger = httpContext.get('logger');
  if (!logger) {
    logger = winstonLogger.child({reqId: httpContext.get('reqId')});
    httpContext.set('logger', logger);
  }
  return logger;
};
