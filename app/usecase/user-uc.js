'use strict';

const UserRepository = require('../infrastructure/datastore/dynamodb/user-repo-impl');
const userRepository = new UserRepository();

module.exports = class UserUsecase {
  static async getUser(id) {
    const result = await userRepository.getUser(id);
    return result;
  }

  static async postUser(id, name) {
    await userRepository.createUser(id, name);
    return {message: 'SUCCESS'};
  }
};
