'use strict';

const context = require('../app/context');

describe('app/context.js', () => {
  test('set/get by string key and string value', () => {
    context.ns().run(() =>
      (function() {
        context.set('test-key', 'test-value');
        const result = context.get('test-key');
        expect(result).toEqual('test-value');
      })()
    );
  });
  test('can not get in Continuation-Local Storage', () => {
    context.ns().run(() =>
      (function() {
        const result = context.get('test-key');
        expect(result).not.toEqual('test-value');
      })()
    );
  });
  test('set/get by string key and string value over callback', () => {
    context.ns().run(() =>
      (function() {
        const callback = () => {
          const result = context.get('test-key');
          expect(result).toEqual('test-value');
        };
        (function(callback) {
          context.set('test-key', 'test-value');
          callback();
        })(callback);
      })()
    );
  });
  test('set/get by string key and object value', () => {
    context.ns().run(() =>
      (function() {
        context.set('test-key', {test: 'test'});
        const result = context.get('test-key');
        expect(result).toEqual({test: 'test'});
      })()
    );
  });
  test('set/get by object key and string value', () => {
    context.ns().run(() =>
      (function() {
        context.set({test: 'test'}, 'test-value');
        const result = context.get({test: 'test'});
        expect(result).toEqual('test-value');
      })()
    );
  });
});
