'use strict';

const dynamodb = require('./dynamodb').dynamodb;
const docClient = require('./dynamodb').docClient;
const UserRepository = require('../../../usecase/repository/user-repo');

class UserRepositoryImpl extends UserRepository {
  constructor() {
    super();
    this.dynamodb = dynamodb;
    this.docClient = docClient;
    this.tableName = 'user';
  }
  async createTable() {
    const params = require('../../../../dynamodb-schema/user.json');
    return this.dynamodb.createTable(params).promise();
  }
  async deleteTable() {
    return this.dynamodb.deleteTable({TableName: this.tableName}).promise();
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
      throw e;
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
      throw e;
    }
  }
  // override
  async listUsers(id) {
    const params = {
      TableName: this.tableName,
      KeyConditions: {
        'id': {
          ComparisonOperator: 'EQ',
          AttributeValueList: [ id ]
        },
      },
    };
    try {
      const result = await this.docClient.query(params).promise();
      return result.Items;
    } catch (e) {
      throw e;
    }
  }
}

module.exports = UserRepositoryImpl;
