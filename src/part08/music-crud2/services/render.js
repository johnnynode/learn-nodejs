/* 该模块用于渲染view层模板 */
"use strict";

const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const mime = require('mime');

module.exports = function (res) {
  // 将render方法挂载到res上, 可用于add和post两种
  res.render = function (viewName, dataObj) {
    fs.readFile(path.join(__dirname, '../views/' + viewName + '.html'), 'utf8', function (err, data) {
      if (err) {
        // 处理404
        res.writeHead(301, {
            'Location': '/error'
        });
        res.end();
      }

      let compiled = _.template(data);
      let htmlStr = compiled(dataObj || {}); // add的时候使用空对象

      // 将完整的html字符串响应给客户端
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
      });

      res.end(htmlStr);
    });
  };

  // 处理收藏家图标
  res.favicon = function () {
    fs.readFile(path.join(__dirname, '../favicon.ico'), 'utf8', (err, data) => {
      if (err) {
        return console.log('未找到收藏家图标!');
      }
      let mimeType = mime.lookup('favicon.ico');

      res.writeHead(200, {
          'Content-Type': mimeType
      });

      res.end(data);
    })
  };

  // 404
  res.error = function () {
    res.render('error'); 
  }
};