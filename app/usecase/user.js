"use strict";

const UserRepository = require("../infrastructure/datastore/dynamodb/user");
const repository = new UserRepository();

const getUser = async id => {
  const result = await repository.getUser(id);
  return result;
};

const putUser = async (id, name) => {
  await repository.createUser(id, name);
  return { message: "SUCCESS" };
};

module.exports = {
  getUser: getUser,
  putUser: putUser
};
