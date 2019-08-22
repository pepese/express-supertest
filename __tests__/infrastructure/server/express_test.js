'use strict';

const app = require('../../../app/infrastructure/server/express');
const request = require('supertest');
const boom = require('boom');
const testJson = {id: '2', name: 'Jiro'};
let auth_token = null;

describe('express.js', () => {
  test('POST /auth 200', () => {
    return request(app)
      .post('/auth')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({id: 'id', password: 'password'})
      .expect(200)
      .then(res => {
        auth_token = res.body.token;
      });
  });
  test('POST /user 400', () => {
    return request(app)
      .post('/user')
      .set('Authorization', `Bearer ${auth_token}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({})
      .expect(400).then(res => {
        expect(res.body.error).toEqual(boom.badRequest().output.payload.error);
      });
  });
  test('POST /user 200', () => {
    return request(app)
      .post('/user')
      .set('Authorization', `Bearer ${auth_token}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(testJson)
      .expect(200);
  });
  test('GET /user 200', () => {
    return request(app)
      .get('/user')
      .set('Authorization', `Bearer ${auth_token}`)
      .set('Accept', 'application/json')
      .query({id: '2'})
      .expect(200).then(res => {
        expect(res.body).toEqual(testJson);
      });
  });
});
