'use strict';

const context = require('../context');
const onHeaders = require('on-headers');
const onFinished = require('on-finished');
const logger = require('../logger');
const Ajv = require('ajv');
const ajv = new Ajv();
const userJsonSchema = require('../../json-schema/user-schema');
const validate = ajv.compile(userJsonSchema);

class Interceptor {
  static accessLogging(req, res, next) {
    onHeaders(res, () => {
      context.set('startAt', process.hrtime());
    });
    onFinished(res, () => {
      if (
        // healthcheck 200 OK の場合はログ出力しない
        !(
          req.originalUrl.match(/healthcheck/) &&
          Math.floor(res.statusCode / 200) == 1
        )
      ) {
        const startAt = context.get('startAt');
        const diff = process.hrtime(startAt);
        const responseTime = diff[0] * 1e9 + diff[1]; // ns
        // アクセスログ出力
        logger.info(`${req.method} ${req.originalUrl}`, {
          req: {
            headers: req.headers,
            query: req.query,
          },
          res: {
            status: res.statusCode,
            responseTime: responseTime,
          },
        });
      }
    });
    next();
  }

  static validateUserJson(data) {
    return new Promise((resolve, reject) => {
      const result = validate(data); // true of false
      if (result) {
        resolve(result);
      } else {
        reject(validate.errors);
      }
    });
  }
}

module.exports = Interceptor;
