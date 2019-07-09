"use strict";

class AppError extends Error {
  constructor(e, errorCode = null) {
    super(e);
    this.name = new.target.name; // name に AppError が入る
    if (errorCode) {
      this.errorCode = errorCode;
    }
  }
}

const codes = {
  "xxxxx": 400,
  "yyyyy": 500
};

module.exports = {
  AppError: AppError,
  codes: codes
};
