'use strict';

const mongodb = require('../mongodb');
const UserRepository = require('../user-repo-impl');
const repository = new UserRepository();
let tmpID;

describe('app/infrastructure/datastore/mongodb/user-repo-impl.js', () => {
  afterAll(() => {
    return mongodb.close(); // これをやらないとテストが正常終了しない。。。なんか効かない。。。
  });
  // 該当データが存在しない場合はエラーではなく空データが返却される
  test('getUser miss match', async () => {
    const result = await repository.getUser('1');
    expect(result).toEqual([]);
  });
  test('createUser', async () => {
    const result = await repository.createUser('Ichiro');
    tmpID = result._id;
    expect(result).not.toEqual(null);
  });
  test('getUser match', async () => {
    const result = await repository.getUser(tmpID);
    expect(result[0]['_doc']).toEqual({__v: 0, _id: tmpID, name: 'Ichiro'});
  });
});
