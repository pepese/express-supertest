'use strict';

const app = require('../../../app/infrastructure/server/express');
const request = require('supertest');
const config = require('../../../app/config');

describe('ECHO TEST', () => {
  test('POST /echo', () => {
    return request(app)
      .get('/echo')
      .expect(200)
      .then(res => {
        expect(res.body.app).toEqual(config.APP_NAME);
        expect(res.body.version).toEqual(config.APP_VERSION);
      });
  });
});
