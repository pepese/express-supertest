'use strict';

class AppError extends Error {
  constructor(message, errorCode = null) {
    super(message);
    this.name = new.target.name; // name に AppError が入る
    if (errorCode) {
      this.errorCode = errorCode;
    }
  }
}

const errorCodes = {
  ERROR001: {
    // データベースアクセスエラー
    code: 'ERROR001',
    status: 500,
    message: 'Database access error.',
  },
  WARN001: {
    // ID/Password 不整合などの認証エラー
    code: 'WARN001',
    status: 400,
    message: 'Resource not found.',
  },
  WARN002: {
    // データ検索の結果、何も見つからなかった
    code: 'WARN002',
    status: 400,
    message: 'Resource not found.',
  },
};

module.exports = {
  AppError: AppError,
  codes: errorCodes,
};
