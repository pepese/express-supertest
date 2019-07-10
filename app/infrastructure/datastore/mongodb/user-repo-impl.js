'use strict';

const logger = require('../../../logger');
const UserRepository = require('../../../usecase/repository/user-repo');
const UserModel = require('./mongodb').User;
const userDoc = new UserModel();

class UserRepositoryImpl extends UserRepository {
  constructor() {
    super();
    this.userDoc = userDoc;
  }

  // override
  async getUser(id) {
    const params = {
      _id: id,
    };
    return new Promise(async (resolve, reject) => {
      try {
        const result = await UserModel.find(params);
        resolve(result);
      } catch (e) {
        logger.error(e.stack);
        reject(e);
      }
    });
  }

  // override
  async createUser(name) {
    const params = {
      name: name,
    };
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.userDoc.save(params);
        resolve(result);
      } catch (e) {
        logger.error(e.stack);
        reject(e);
      }
    });
  }
}

module.exports = UserRepositoryImpl;
