'use strict';

const UserRepository = require('../../../app/usecase/repository/user-repo');
const userRepository = new UserRepository();

describe('app/usecase/repository/user-repo.js', () => {
  test('listUsers()', async () => {
    try {
      await userRepository.listUsers();
    } catch (e) {
      expect(e.message).toEqual('Not Implimented');
    }
  });
  test('getUser()', async () => {
    try {
      await userRepository.getUser();
    } catch (e) {
      expect(e.message).toEqual('Not Implimented');
    }
  });
  test('createUser()', async () => {
    try {
      await userRepository.createUser();
    } catch (e) {
      expect(e.message).toEqual('Not Implimented');
    }
  });
});
