"use strict";

const ContextRepository = require("../../../usecase/repository/context-repo");
const httpContext = require("express-http-context");

class ContextRepositoryImpl extends ContextRepository {
  constructor() {
    super();
  }
  // override
  static async set(key, value) {
    httpContext.set(key, value);
  }
  // override
  static async get(key) {
    httpContext.get(key);
  }
}

module.exports = ContextRepositoryImpl;
