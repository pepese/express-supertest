'use strict';

const AppError = require('../error').AppError;

describe('app/error.js', () => {
  test('can new', () => {
    const err = new AppError('test');
    // console.log('err.name: %o', err.name);
    // console.log('err.message: %o', err.message);
    // console.log('err.stack: %o', err.stack);
    // console.log('err.errorCode: %o', err.errorCode);
    // console.log('err instanceof AppError: %o', err instanceof AppError);
    expect(err.name).toEqual('AppError');
    expect(err.message).toEqual('test');
    expect(err.stack.length).toBeGreaterThan(1);
    expect(err.errorCode).toBeUndefined();
    expect(err instanceof AppError).toEqual(true);
  });
  test('can new from Erro', () => {
    const e = new Error('test');
    const err = new AppError(e);
    // console.log('err.name: %o', err.name);
    // console.log('err.message: %o', err.message);
    // console.log('err.stack: %o', err.stack);
    // console.log('err.errorCode: %o', err.errorCode);
    // console.log('err instanceof AppError: %o', err instanceof AppError);
    expect(err.name).toEqual('AppError');
    expect(err.message).toEqual('Error: test'); // メッセージに前の Error 名が引き継がれる
    expect(err.stack.length).toBeGreaterThan(1);
    expect(err.errorCode).toBeUndefined();
    expect(err instanceof AppError).toEqual(true);
  });
  test('can new from Erro with errorCode', () => {
    const e = new Error('test');
    const err = new AppError(e, 'xxxxx');
    // console.log('err.name: %o', err.name);
    // console.log('err.message: %o', err.message);
    // console.log('err.stack: %o', err.stack);
    // console.log('err.errorCode: %o', err.errorCode);
    // console.log('err instanceof AppError: %o', err instanceof AppError);
    expect(err.name).toEqual('AppError');
    expect(err.message).toEqual('Error: test'); // メッセージに前の Error 名が引き継がれる
    expect(err.stack.length).toBeGreaterThan(1);
    expect(err.errorCode).toEqual('xxxxx');
    expect(err instanceof AppError).toEqual(true);
  });
});
