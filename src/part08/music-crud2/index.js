"use strict";

const http = require('http');
const url = require('url');
const router = require('./services/router');

const render = require('./services/render');
const staticServe = require('./services/static-server');
const bodyParser = require('./services/body-parser');

const server = http.createServer((req, res) => {
  req.query = url.parse(req.url, true).query;
  render(res);
  staticServe(req, res, function () {
    bodyParser(req, function () {
      router(req, res);
    });
  });
});

server.listen(3000, '127.0.0.1', function () {
  console.log('server is listening at port 3000');
});