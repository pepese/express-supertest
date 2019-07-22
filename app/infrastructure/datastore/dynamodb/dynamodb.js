'use strict';

const config = require('../../../config');
const AWS = require('aws-sdk');
AWS.config.update({
  region: config.AWS_REGION,
  endpoint: config.DYNAMODB_ENDPOINT,
});
const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

module.exports = {
  dynamodb: dynamodb,
  docClient: docClient
}
