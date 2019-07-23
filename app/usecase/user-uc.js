'use strict';

const UserRepository = require('../infrastructure/datastore/dynamodb/user-repo-impl');
const userRepository = new UserRepository();
const ContextRepository = require('../infrastructure/datastore/local/context-repo-impl');

const getUser = async id => {
  console.log('!!!!! (reqId, loginId) = (%o, %o) !!!!!', ContextRepository.get('reqId'), ContextRepository.get('id'));
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
