"use strict";

const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000",
  accessKeyId: "fakeMyKeyId",
  secretAccessKey: "fakeSecretAccessKey"
});
const dynamodb = new AWS.DynamoDB();
const UserRepository = require("../../../usecase/repository/user");

class UserRepositoryImpl extends UserRepository {
  constructor() {
    super();
    this.dynamodb = dynamodb;
    this.tableName = "user";
  }
  async createTable() {
    const params = {
      AttributeDefinitions: [
        {
          AttributeName: "id",
          AttributeType: "S"
        }
      ],
      KeySchema: [
        {
          AttributeName: "id",
          KeyType: "HASH"
        }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
      },
      TableName: this.tableName
    };
    return this.dynamodb.createTable(params).promise();
  }
  async deleteTable() {
    return this.dynamodb.deleteTable({ TableName: this.tableName }).promise();
  }
  // override
  async getUser(id) {
    const params = {
      Key: {
        id: { S: id }
      },
      TableName: this.tableName
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
        id: { S: id },
        name: { S: name }
      },
      TableName: this.tableName
    };
    try {
      const result = await this.dynamodb.putItem(params).promise();
      return result != null;
    } catch (e) {
      throw e;
    }
  }
}

module.exports = UserRepositoryImpl;
