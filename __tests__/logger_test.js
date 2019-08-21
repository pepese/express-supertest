'use strict';

const context = require('../app/context');

// console 呼び出し時の引数取得用
// global.console.log で引数を取得できる。
global.console = {
  log: jest.fn(),
  info: jest.fn(),
  error: jest.fn(),
};

describe('app/logger.js', () => {
  test('info string', () => {
    context.ns().run(() =>
      (function() {
        context.set('reqId', 'testId');
        const logger = require('../app/logger');
        logger.info('hoge');
        expect(global.console.log).toHaveBeenCalledWith(
          expect.stringMatching(
            /{"message":\["hoge"\],"level":"info","timestamp":"[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{3}Z"}/
          )
        );
      })()
    );
  });
  test('info object', () => {
    const logger = require('../app/logger');
    logger.info({
      column1: 'hoge',
      column2: 'fuge',
    });
  });
});
