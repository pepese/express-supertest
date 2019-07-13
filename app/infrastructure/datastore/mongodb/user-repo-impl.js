'use strict';

const logger = require('../../../logger');
const UserRepository = require('../../../usecase/repository/user-repo');
const UserModel = require('./mongodb').User;

class UserRepositoryImpl extends UserRepository {
  constructor() {
    super();
  }

  // override
  async getUser(id) {
    try {
      const query = UserModel.find({ _id: id });
      return await query.exec();
    } catch (e) {
      logger.error(e.stack);
      throw e;
    }
  }

  // override
  async createUser(name) {
    try {
      const userDoc = new UserModel({ name: name });
      return await userDoc.save();
    } catch (e) {
      logger.error(e.stack);
      throw e;
    }
  }
}

module.exports = UserRepositoryImpl;
