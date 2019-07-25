'use strict';

const UserRepository = require('../infrastructure/datastore/dynamodb/user-repo-impl');
const userRepository = new UserRepository();

const getUser = async id => {
  const result = await userRepository.getUser(id);
  return result;
};

const putUser = async (id, name) => {
  await userRepository.createUser(id, name);
  return {message: 'SUCCESS'};
};

module.exports = {
  getUser: getUser,
  putUser: putUser,
};
