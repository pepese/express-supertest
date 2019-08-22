'use strict';

const Interceptor = require('../../app/interface/interceptor');

describe('app/interface/interceptor.js', () => {
  test('validateUserJson() OK', async () => {
    const result = await Interceptor.validateUserJson({
      id: '1',
      name: 'ichiro',
    });
    expect(result).toEqual(true);
  });
  test('validateUserJson() NG', async () => {
    const result = Interceptor.validateUserJson({id: 1, name: 'ichiro'});
    await expect(result).rejects.not.toBeNull();
  });
});
