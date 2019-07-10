'use strict';

const UserRepository = require('./app/infrastructure/datastore/dynamodb/user-repo-impl');
const repository = new UserRepository();

(async function() {
  try {
    await repository.createTable();
  } catch (e) {
    console.log('error: %s', e);
  }
})();
