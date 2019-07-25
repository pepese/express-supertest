'use strict';

require('dotenv').config();

exports.APP_NAME = process.env.APP_NAME || 'express-supertest';
exports.APP_VERSION = process.env.APP_VERSION || 'undefined';
exports.AWS_REGION = process.env.AWS_REGION || 'us-west-2';
exports.DYNAMODB_ENDPOINT =
  process.env.DYNAMODB_ENDPOINT || 'http://localhost:8000';
exports.SECRET = process.env.SECRET || 'secret';
exports.TOTP_TTL = process.env.TOTP_TTL || 1;
