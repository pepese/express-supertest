'use strict';

const httpContext = require('express-http-context');
const uuid = require('uuid');
const config = require('./config');

/**
 * リクエストスコープ・スレッドローカルライクな機能を提供する。<br>
 * Express のミドルウェアに以下を適用する。
 * <code><pre>
 * app.use(context.middleware);
 * app.use(context.init);
 * </pre></code>
 */
class Context {
  /**
   * Express のミドルウェアに適用する。
   * @param {object} req - Express req object.
   * @param {object} res - Express res object.
   * @param {object} next - Express next object.
   */
  static middleware(req, res, next) {
    httpContext.middleware(req, res, next);
  }

  /**
   * リクエスト ID 、アプリケーション名、アプリケーションバージョン の取得・設定を行う。<br>
   * その他、情報を設定したい場合はここへ記載のこと。<br>
   * また、<code>log-keys</code>へログ出力したいキーを設定し、ロガーから参照するようにしている。
   * @todo 追加で設定したい情報などあれば。
   * @param {object} req - Express req object.
   * @param {object} res - Express res object.
   * @param {object} next - Express next object.
   */
  static init(req, res, next) {
    // req/res 紐付け
    httpContext.ns.bindEmitter(req);
    httpContext.ns.bindEmitter(res);
    // 値のセット
    let reqId;
    if (req.header('X-Request-Id')) {
      reqId = req.header('X-Request-Id');
    } else if (req.header('X-Amzn-Trace-Id')) {
      reqId = req.header('X-Amzn-Trace-Id');
    } else {
      reqId = uuid.v4();
    }
    httpContext.set('reqId', reqId);
    httpContext.set('app', config.APP_NAME);
    httpContext.set('version', config.APP_VERSION);
    // ロガーに追加情報を教える key
    httpContext.set('log-keys', ['reqId', 'app', 'version']);
    next();
  }

  /**
   * テスト用に作成したので、基本使用しない。
   * @return {object} namespace object.
   */
  static ns() {
    return httpContext.ns;
  }

  /**
   * key-value store 的な感じで使える setter 。
   * @param {object} key - Key.
   * @param {object} value - Value.
   */
  static set(key, value) {
    httpContext.set(key, value);
  }

  /**
   * key-value store 的な感じで使える getter 。
   * @param {object} key - Key.
   * @return {object} - set で設定したオブジェクトを返却。
   */
  static get(key) {
    return httpContext.get(key);
  }
}

module.exports = Context;
