"use strict";

const qstring = require('querystring');

module.exports = function (req, next) {
  // 当请求进来之后，先看看有没有请求体，如果有，动态的解析出来，解析完后挂载到req对象上
  // 如果没有，继续向后执行
  // 如果请求行中有 content-length ，表示是通过post方式提交的表单
  if ('content-length' in req.headers) {
    let data = '';
    req.on('data', function (chunk) {
      data += chunk;
    });
    req.on('end', function () {
      req.body = qstring.parse(data);
      next();
    });
  } else {
    req.body = {}; // 如果不是post请求，那么也给req挂载一个body空对象，防止后面使用的时候出错
    next();
  }
};