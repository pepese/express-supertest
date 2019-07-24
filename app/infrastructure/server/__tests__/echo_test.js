'use strict';

const app = require('../express');
const request = require('supertest');

describe('ECHO TEST', () => {
  test('POST /echo', () => {
    return request(app)
      .get('/echo')
      .expect(200);
      // .then(res => {
      //   auth_token = res.body.token;
      // });
  });
});
