'use strict';

const dynamodb = require('./dynamodb').dynamodb;
const docClient = require('./dynamodb').docClient;
const AppRepository = require('../../../usecase/repository/app-repo');

class AppRepositoryImpl extends AppRepository {
  constructor() {
    super();
    this.dynamodb = dynamodb;
    this.docClient = docClient;
    this.tableName = 'app';
  }
  async createTable() {
    const params = require('../../../../schemas/app.json');
    return this.dynamodb.createTable(params).promise();
  }
  async deleteTable() {
    return this.dynamodb.deleteTable({TableName: this.tableName}).promise();
  }
  // override
  async getApp(id) {
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
  async createApp(id, name) {
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
  async listApps(id) {
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

module.exports = AppRepositoryImpl;
