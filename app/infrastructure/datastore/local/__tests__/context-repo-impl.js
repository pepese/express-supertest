'use strict';

const context = require('express-http-context');
const ContextRepository = require('../context-repo-impl');

describe('app/infrastructure/datastore/local/context-repo-impl.js', () => {
  test('set/get by string key and string value', () => {
    context.ns.run(() =>
      (function() {
        ContextRepository.set('test-key', 'test-value');
        const result = ContextRepository.get('test-key');
        expect(result).toEqual('test-value');
      })()
    );
  });
  test('can not get in Continuation-Local Storage', () => {
    context.ns.run(() =>
      (function() {
        const result = ContextRepository.get('test-key');
        expect(result).not.toEqual('test-value');
      })()
    );
  });
  test('set/get by string key and string value over callback', () => {
    context.ns.run(() =>
      (function() {
        const callback = () => {
          const result = ContextRepository.get('test-key');
          expect(result).toEqual('test-value');
        };
        (function(callback) {
          ContextRepository.set('test-key', 'test-value');
          callback();
        })(callback);
      })()
    );
  });
  test('set/get by string key and object value', () => {
    context.ns.run(() =>
      (function() {
        ContextRepository.set('test-key', {test: 'test'});
        const result = ContextRepository.get('test-key');
        expect(result).toEqual({test: 'test'});
      })()
    );
  });
  test('set/get by object key and string value', () => {
    context.ns.run(() =>
      (function() {
        ContextRepository.set({test: 'test'}, 'test-value');
        const result = ContextRepository.get({test: 'test'});
        expect(result).toEqual('test-value');
      })()
    );
  });
});
