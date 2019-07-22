'use strict';

const UserRepository = require('../user-repo-impl');
const repository = new UserRepository();

describe('user.js', () => {
  test('Table Creation Error', async () => {
    try {
      const result = await repository.createTable();
      expect(result).toEqual(null);
    } catch (e) {
      expect(e.name).toEqual('ResourceInUseException');
      expect(e.message).toEqual('Cannot create preexisting table');
    }
  });
  // 該当データが存在しない場合はエラーではなく空データが返却される
  test('getUser miss match', async () => {
    try {
      const result = await repository.getUser('1');
      expect(result).toEqual({});
    } catch (e) {
      console.log('error.name: %s', e.name);
      console.log('error.message: %s', e.message);
      throw e;
    }
  });
  test('createUser', async () => {
    try {
      const result = await repository.createUser('1', 'Ichiro');
      expect(result).toEqual(true);
    } catch (e) {
      console.log('error.name: %s', e.name);
      console.log('error.message: %s', e.message);
      throw e;
    }
  });
  test('getUser match', async () => {
    try {
      const result = await repository.getUser('1');
      expect(result).toEqual({id: '1', name: 'Ichiro'});
    } catch (e) {
      console.log('error.name: %s', e.name);
      console.log('error.message: %s', e.message);
      throw e;
    }
  });
  // すでに存在するキーに対して異なる項目値で putItem
  test('createUser Same Key', async () => {
    try {
      const result = await repository.createUser('1', 'Ichiro_rename');
      expect(result).toEqual(true);
    } catch (e) {
      console.log('error.name: %s', e.name);
      console.log('error.message: %s', e.message);
      throw e;
    }
  });
  // 上記のオペレーションが更新として処理されていることを確認。。。
  test('getUser match check putItem again', async () => {
    try {
      const result = await repository.getUser('1');
      expect(result).toEqual({id: '1', name: 'Ichiro_rename'});
    } catch (e) {
      console.log('error.name: %s', e.name);
      console.log('error.message: %s', e.message);
      throw e;
    }
  });
  test('listUsers', async () => {
    const result = await repository.listUsers('1');
    expect(result[0]).toEqual({id: '1', name: 'Ichiro_rename'});
  });
});
