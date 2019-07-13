'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuid = require("uuid");

// スキーマ
const UserSchema = new Schema({
  _id: { type: String, default: uuid.v4 },
  name: String,
});

const connection = mongoose.createConnection('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
});

module.exports = {
  User: connection.model('User', UserSchema),
  close: async () => {await mongoose.connection.close()}
};
