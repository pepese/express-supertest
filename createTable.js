'use strict';

const dynamodb = require('./app/infrastructure/datastore/dynamodb/dynamodb').dynamodb;

(async function() {
  try {
    const params = require('./dynamodb-schema/user.json');
    await dynamodb.createTable(params).promise();
  } catch (e) {
    console.log('error: %s', e);
  }
})();

// async deleteTable() {
//   return dynamodb.deleteTable({TableName: tableName}).promise();
// }
