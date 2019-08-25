'use strict';

const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const boom = require('boom');
const logger = require('../logger');
const Interceptor = require('./interceptor');
const userUC = require('../usecase/user-uc');
const tokenUC = require('../usecase/token-uc');
const pdfUC = require('../usecase/view-uc');
const echoUC = require('../usecase/echo-uc');

/////////////////////
// access logging
/////////////////////

router.use(Interceptor.accessLogging);

/////////////////////
// application logics
/////////////////////

router.get('/echo', (req, res) => {
  const result = echoUC.echo();
  res.status(200).json(result);
});

router.post(
  '/auth',
  [
    body('id')
      .isString()
      .isLength({min: 1}),
    body('password')
      .isString()
      .isLength({min: 1}),
  ],
  async (req, res, next) => {
    // validator
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn(errors.array());
      next(boom.badRequest(errors.array()));
    } else {
      // コンテンツネゴシエーション（Accept header で分岐）
      res.format({
        'application/json': async () => {
          const id = req.body.id;
          const password = req.body.password;
          res.json({token: tokenUC.auth(id, password)});
        },
        default: () => {
          const result = boom.notAcceptable('cannot accept');
          res.status(result.output.statusCode).send(result.output.payload);
        },
      });
    }
  }
);

router.get('/user', tokenUC.verifyJWT, async (req, res) => {
  res.format({
    'application/json': async () => {
      const id = req.query.id;
      const result = await userUC.getUser(id);
      res.json(result);
    },
    default: () => {
      const result = boom.notAcceptable('cannot accept');
      res.status(result.output.statusCode).send(result.output.payload);
    },
  });
});

router.post(
  '/user',
  tokenUC.verifyJWT,
  [
    body().custom(async value => {
      return await Interceptor.validateUserJson(value);
    }),
  ],
  async (req, res, next) => {
    // validator
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn(errors.array());
      next(boom.badRequest(errors.array()));
    } else {
      res.format({
        'application/json': async () => {
          const id = req.body.id;
          const name = req.body.name;
          const result = await userUC.postUser(id, name);
          res.json(result);
        },
        default: () => {
          const result = boom.notAcceptable('cannot accept');
          res.status(result.output.statusCode).send(result.output.payload);
        },
      });
    }
  }
);

router.get('/pdf', async (req, res) => {
  const result = await pdfUC.getPdf();
  res.send(result);
});

module.exports = router;
