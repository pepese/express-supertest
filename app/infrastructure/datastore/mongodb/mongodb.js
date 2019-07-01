"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// スキーマ
const UserSchema = new Schema({
  name: String
});

const connection = mongoose.createConnection("mongodb://localhost:27017/test");

exports.User = connection.model("User", UserSchema);
