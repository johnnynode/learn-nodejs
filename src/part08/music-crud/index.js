"use strict";

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const qstring = require('querystring');
const _ = require('underscore');
const musicList = require('./musicData'); // 获取数据

// 用来匹配删除链接的url
const regex_remove = /^\/remove\/(\d{1,6})$/;

const server = http.createServer((req, res) => {
    let urlObj = url.parse(req.url);
    let pathname = urlObj.pathname;
    let method = req.method;

    if (pathname === '/') {
        fs.readFile(path.join(__dirname, 'index.html'), 'utf8', function (err, data) {
            if (err) {
                return res.end(err.message);
            }
            let compiled = _.template(data);
            let htmlStr = compiled({
                musicList
            });
            // 将完整的html字符串响应给客户端
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.end(htmlStr);
        });
    } else if (method === 'GET' && pathname === '/add') {
        fs.readFile(path.join(__dirname, 'add.html'), 'utf8', function (err, data) {
            if (err) {
                return res.end(err.message);
            }
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.end(data);
        });
    } else if (method === 'POST' && pathname === '/add') {
        recivePostData(req, function (requestBody) {
            let id = requestBody.id;
            let name = requestBody.name;
            let singer = requestBody.singer;
            let isHightRate = requestBody.isHightRate;
            let musicInfo = musicList.find(m => m.id === id);
            if (musicInfo) {
                return res.end('music is already exists');
            }
            isHightRate = isHightRate === '1';
            musicList.push({
                id,
                name,
                singer,
                isHightRate
            });
            console.log('here1');
            res.end('success');
            // 2s 后跳转到 暂时无法做到！ /
            /*
            setTimeout(function(){
                console.log('here2');
                res.writeHead(302, {
                    'Location': '/'
                });
                console.log('here3');
                res.end('111');
            },2000);
            */

        });
    } else if (method === 'GET' && regex_remove.test(pathname)) {
        let m_id = pathname.match(regex_remove)[1];
        let index = musicList.findIndex(m => m.id === m_id);
        console.log(index);
        musicList.splice(index, 1);
        res.end('remove success');
    } else if (method === 'GET' && pathname === '/error') {
        fs.readFile( path.join(__dirname, '404.html'), 'utf8', (err, data) => {
            if (err) {
                return res.end(err.message);
            }
            let compiled = _.template(data);
            let htmlStr = compiled({
                musicList
            });
            // 将完整的html字符串响应给客户端
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            });
            res.end(htmlStr);
        });
    } else {
        // 处理404
        res.writeHead(301, {
            'Location': '/error'
        });
        res.end();
    }
});

server.listen(3000, '127.0.0.1', () => {
    console.log('server is listening at port 3000');
});

/* 处理post的数据 */
function recivePostData(request, callback) {
    let data = '';
    request.on('data', function (chunk) {
        data += chunk;
    });
    request.on('end', function () {
        callback(qstring.parse(data));
    });
}