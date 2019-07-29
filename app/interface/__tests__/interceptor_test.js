'use strict';

const Interceptor = require('../interceptor');

describe('app/interface/interceptor.js', () => {
  test('validateUserJson() OK', () => {
    const req = {
      body: {id: '1', name: 'ichiro'},
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    const next = jest.fn().mockReturnThis();
    Interceptor.validateUserJson(req, res, next);
    expect(next.mock.calls[0][0]).toBeUndefined();
  });
  test('validateUserJson() NG', () => {
    const req = {
      body: {id: 1, name: 'ichiro'},
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    const next = jest.fn().mockReturnThis();
    Interceptor.validateUserJson(req, res, next);
    expect(res.status.mock.calls[0][0]).toBe(400);
    expect(res.json.mock.calls[0][0]).not.toBeUndefined();
  });
});
