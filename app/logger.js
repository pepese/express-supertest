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

// exports.getLogger = () => {
//   let logger = httpContext.get('logger');
//   if (!logger) {
//     const reqId = httpContext.get('reqId');
//     console.log('@logger reqId is %s .', reqId);
//     logger = winstonLogger.child({reqId: reqId});
//     httpContext.set('logger', logger);
//   }
//   return logger;
// };

exports.init = () => {
  const logger = winstonLogger.child({reqId: httpContext.get('reqId')});
  httpContext.set('logger', logger);
}

// exports.getLogger = () => {
//   let logger = httpContext.get('logger');
//   if (!logger) {
//     this.init();
//     logger = httpContext.get('logger');
//   }
//   if (!logger) {
//     throw new Error('Logger is not initted.');
//   }
//   return logger;
// }

exports.getLogger = () => {
  const logger = httpContext.get('logger');
  if (logger) {
    return logger;
  } else {
    return winstonLogger.child({reqId: httpContext.get('reqId')});
  }
}
