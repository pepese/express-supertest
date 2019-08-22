'use strict';

const logger = require('../../../logger');
const boom = require('boom');
const UserRepository = require('../../../usecase/repository/user-repo');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuid = require('uuid');
const UserSchema = new Schema({
  _id: {type: String, default: uuid.v4},
  name: String,
});
const connection = require('./mongodb');
const UserModel = connection.model('User', UserSchema);

class UserRepositoryImpl extends UserRepository {
  constructor() {
    super();
  }

  // override
  async getUser(id) {
    try {
      const query = UserModel.find({_id: id});
      return await query.exec();
    } catch (e) {
      if (boom.isBoom(e)) {
        throw e;
      } else {
        logger.error(e.stack);
        throw boom.badImplementation(e);
      }
    }
  }

  // override
  async createUser(name) {
    try {
      const userDoc = new UserModel({name: name});
      return await userDoc.save();
    } catch (e) {
      if (boom.isBoom(e)) {
        throw e;
      } else {
        logger.error(e.stack);
        throw boom.badImplementation(e);
      }
    }
  }
}

module.exports = UserRepositoryImpl;
