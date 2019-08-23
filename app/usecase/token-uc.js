'use strict';

const TokenDomain = require('../domain/token-domain');
const context = require('../context');

module.exports = class AuthUsecase {
  static auth(id, password) {
    // TODO: MUST check id and password.
    return TokenDomain.createJWT({id: id, password: password});
  }

  static verifyJWT(req, res, next) {
    try {
      if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
      ) {
        const result = TokenDomain.verifyJWT(
          req.headers.authorization.split(' ')[1]
        );
        if (result && result.id) {
          res.locals.id = result.id;
          context.set('id', result.id);
          next();
        }
      }
    } catch (e) {
      res.status(401);
    }
  }
};
