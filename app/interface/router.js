'use strict';

const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const Interceptor = require('./interceptor');
const userUC = require('../usecase/user-uc');
const tokenUC = require('../usecase/token-uc');
const pdfUC = require('../usecase/view-uc');
const echoUC = require('../usecase/echo-uc');

/////////////////////
// access logging
/////////////////////

router.get('/echo', Interceptor.accessLogging);

/////////////////////
// application logics
/////////////////////

router.get('/echo', (req, res) => {
  const result = echoUC.echo();
  res.status(200).json(result);
});

router.post('/auth', (req, res) => {
  const id = req.body.id;
  const password = req.body.password;
  // コンテンツネゴシエーション（アクセプトヘッダを見て分岐）
  res.format({
    'application/json': () => {
      res.json({token: tokenUC.auth(id, password)});
    },
    default: () => {
      res.status(406).send(body406);
    },
  });
});

router.get('/user', tokenUC.verifyJWT);
router.get(
  '/user',
  [
    body().custom(async value => {
      try {
        const result = await Interceptor.validateUserJson({
          DigitalReceipt: value,
        });
        return result;
      } catch (e) {
        throw e;
      }
    }),
  ],
  async (req, res) => {
    // validator
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
    } else {
      const id = req.query.id;
      const result = await userUC.getUser(id);
      res.format({
        'application/json': () => {
          res.json(result);
        },
        default: () => {
          res.status(406).send(body406);
        },
      });
    }
  }
);
router.put('/user', tokenUC.verifyJWT);
router.put('/user', async (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const result = await userUC.putUser(id, name);
  res.format({
    'application/json': () => {
      res.json(result);
    },
    default: () => {
      res.status(406).send(body406);
    },
  });
});
router.get('/pdf', async (req, res) => {
  const result = await pdfUC.getPdf();
  res.send(result);
});

const body406 = {
  message: 'Not Acceptable',
};

module.exports = router;
