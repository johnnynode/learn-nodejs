"use strict";

const http = require('http');
const server = http.createServer();
const path = require('path');
const rootDir = path.resolve(__dirname, 'public');
const handler = require('./handler');

server.on('request', function (req, res) {
    let url = req.url;
    let method = req.method;
    if (method !== 'GET') {
        return;
    }
    if (url === '/') {
        handler.handleDir(rootDir, res); // 读取根目录
    } else if (url.includes('.')) {
        handler.handleFile(path.join(__dirname, url), res); // 读取文件
    } else {
        handler.handleDir(path.join(rootDir, url), res); // 读取下级目录
    }
});

server.listen(3000, '127.0.0.1', () => {
    console.log('server is running at port 3000');
});