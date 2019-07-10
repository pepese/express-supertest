'use strict';

const app = require('./infrastructure/server/express');
const http = require('http');

if (!module.parent) {
  const server = http.createServer(app);
  // listenポートを指定してHTTP serverを起動
  server.listen('3000', () => console.log(`API running on localhost:3000`));
}
