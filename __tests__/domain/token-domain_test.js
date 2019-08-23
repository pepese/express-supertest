'use strict';

const TokenDomain = require('../../app/domain/token-domain');
let jwtTmp;
let tmpToken, tmpTime;

describe('token-domain.js', () => {
  test('createJWT()', () => {
    const payload = {id: '1', password: 'password'};
    jwtTmp = TokenDomain.createJWT(payload);
    expect(jwtTmp).not.toEqual(null);
  });
  test('verifyJWT() OK', () => {
    const payload = TokenDomain.verifyJWT(jwtTmp);
    expect(payload.id).toEqual('1');
    expect(payload.password).toEqual('password');
  });
  test('createTOTP()', () => {
    const {token, time} = TokenDomain.createTOTP();
    tmpToken = token;
    tmpTime = time;
    expect(tmpToken.length).toEqual(6);
  });
  test('verifyTOTP() OK', () => {
    expect(TokenDomain.verifyTOTP(tmpToken, tmpTime)).toEqual(true);
  });
  test('verifyTOTP() NG', () => {
    expect(TokenDomain.verifyTOTP('xxxxxx', tmpTime)).toEqual(false);
  });
  test('verifyTOTP() Timeout', () => {
    const sleep = (waitSeconds, someFunction) => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(someFunction());
        }, waitSeconds * 1000);
      });
    };
    const verify = () => {
      const check = TokenDomain.verifyTOTP(tmpToken);
      expect(check).toEqual(false);
    };
    return sleep(3, verify);
  });
});
