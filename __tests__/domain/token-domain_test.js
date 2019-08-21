'use strict';

const TokenDomain = require('../../app/domain/token-domain');
let jwtTmp = null;
let totpTmp = null;

describe('token-domain.js', () => {
  test('createJWT', () => {
    const payload = {id: '1', password: 'password'};
    jwtTmp = TokenDomain.createJWT(payload);
    expect(jwtTmp).not.toEqual(null);
  });
  test('verifyJWT OK', () => {
    const payload = TokenDomain.verifyJWT(jwtTmp);
    expect(payload.id).toEqual('1');
    expect(payload.password).toEqual('password');
  });
  test('createTOTP', () => {
    expect(TokenDomain.createTOTP().length).toEqual(6);
  });
  test('verifyTOTP OK', () => {
    expect(TokenDomain.verifyTOTP(totpTmp)).toEqual(null);
  });
  test('verifyTOTP NG', () => {
    const sleep = (waitSeconds, someFunction) => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(someFunction());
        }, waitSeconds * 1000);
      });
    };
    const verify = () => {
      const check = TokenDomain.verifyTOTP(totpTmp);
      expect(check).toEqual(null);
    };
    return sleep(3, verify);
  });
});
