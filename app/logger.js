"use strict";

const winston = require("winston");
const httpContext = require("express-http-context");

const winstonLogger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.Console()
  ]
});

// Wrap Winston logger to print reqId in each log
var formatMessage = function(message) {
    var requestId = httpContext.get("requestId");
    if (requestId) {
      message.requestId = requestId;
    }
    return message;
};

var logger = {
    log: function(level, message, meta = null) {
        winstonLogger.log(level, formatMessage(message), meta);
    },
    error: function(message) {
        winstonLogger.error(formatMessage(message));
    },
    warn: function(message) {
        winstonLogger.warn(formatMessage(message));
    },
    verbose: function(message) {
        winstonLogger.verbose(formatMessage(message));
    },
    info: function(message) {
        winstonLogger.info(formatMessage(message));
    },
    debug: function(message) {
        winstonLogger.debug(formatMessage(message));
    },
    silly: function(message) {
        winstonLogger.silly(formatMessage(message));
    }
};

module.exports = logger;
