'use strict';

const dynamodb = require('./dynamodb').dynamodb;
const docClient = require('./dynamodb').docClient;
const UserRepository = require('../../../usecase/repository/user-repo');
const logger = require('../../../logger');
const boom = require('boom');

class UserRepositoryImpl extends UserRepository {
  constructor() {
    super();
    this.dynamodb = dynamodb;
    this.docClient = docClient;
    this.tableName = 'user';
  }
  // override
  async getUser(id) {
    const params = {
      Key: {
        id: {S: id},
      },
      TableName: this.tableName,
    };
    try {
      const result = await this.dynamodb.getItem(params).promise();
      const data = {};
      if (result && result.Item && result.Item.name) {
        data.id = id;
        data.name = result.Item.name.S;
      }
      return data;
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
  async createUser(id, name) {
    const params = {
      Item: {
        id: {S: id},
        name: {S: name},
      },
      TableName: this.tableName,
    };
    try {
      const result = await this.dynamodb.putItem(params).promise();
      return result != null;
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
  async listUsers(id) {
    const params = {
      TableName: this.tableName,
      KeyConditions: {
        id: {
          ComparisonOperator: 'EQ',
          AttributeValueList: [id],
        },
      },
    };
    try {
      const result = await this.docClient.query(params).promise();
      return result.Items;
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
