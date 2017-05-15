"use strict";

const fs = require('fs');
const path = require('path');
const http = require('http');
const server = http.createServer();
const url = require('url'); // 处理url路径的模块
const qstring = require('querystring'); // 将一个查询字符串转换为一个对象

server.on('request', function (req, res) {
    let urlObj = url.parse(req.url);
    let pathname = urlObj.pathname;
    let method = req.method;
    // index
    if (pathname === '/') {
        fs.readFile(path.join(__dirname, 'index.html'), 'utf8', (err, data) => {
            if (err) {
                return res.end(err.message);
            }
            // 设置响应头
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            });
            res.end(data);
        })
    } else if (pathname === '/login' && method === 'GET') {
        fs.readFile(path.join(__dirname, 'login.html'), 'utf8', (err, data) => {
            if (err) {
                return res.end(err.message);
            }
            res.writeHead(200, {
                'Content-Type': 'text/html;charset=utf-8'
            });
            res.end(data);
        })
    } else if (pathname === '/login' && method === 'POST') {
        // 开始处理请求：
        parsePostData(req, (queryObj) => {
            console.log(queryObj); // 输出请求对象
        })
    } else {
        // 404 处理
        fs.readFile(path.join(__dirname, '404.html'), (err, data) => {
            if (err) {
                return res.end(err.message);
            }
            res.writeHead(200, {
                'Content-Type': 'text/html;charset=utf-8'
            });
            res.end(data);
        });
    }
});

server.listen(3000, '127.0.0.1', () => {
  console.log('server is listening at port 3000');
});

// 解析post请求的函数
function parsePostData(req, callback) {
    let data = '';
    req.on('data', (chunk) => {
        data += chunk;
    });
    req.on('end', () => {
        let queryObj = qstring.parse(data);
        callback(queryObj);
    })
}
