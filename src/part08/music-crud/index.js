"use strict";

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const qstring = require('querystring');
const _ = require('underscore');

/* 模拟的假数据 */
const musicList = [
    {
        id: '1',
        name: '雪天',
        singer: '雪儿',
        isHightRate: true
    },
    {
        id: '2',
        name: '蓝雪在飘',
        singer: '敏敏',
        isHightRate: false
    },
    {
        id: '3',
        name: '平凡之路',
        singer: '朴树',
        isHightRate: true
    },
    {
        id: '4',
        name: 'You and Me',
        singer: 'Rosie Tomas',
        isHightRate: true
    },
    {
        id: '5',
        name: '绅士',
        singer: '薛之谦',
        isHightRate: false
    }
];

// 用来匹配删除链接的url
const regex_remove = /^\/remove\/(\d{1,6})$/;

const server = http.createServer((req, res) => {
    let urlObj = url.parse(req.url);
    let pathname = urlObj.pathname;
    let method = req.method;

    if (pathname === '/') {
        fs.readFile('./index.html', 'utf8', function (err, data) {
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
        fs.readFile('./add.html', 'utf8', function (err, data) {
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
            isHightRate = isHightRate === '1' ? true : false;
            musicList.push({
                id,
                name,
                singer,
                isHightRate
            });
            res.end('success');
        });
    } else if (method === 'GET' && regex_remove.test(pathname)) {
        let m_id = pathname.match(regex_remove)[1];
        let index = musicList.findIndex(m => m.id === m_id);
        console.log(index);
        musicList.splice(index, 1);
        res.end('remove success');
    } else if (method === 'GET' && pathname === '/error') {
        fs.readFile('./404.html', 'utf8', (err, data) => {
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

function recivePostData(request, callback) {
    let data = '';
    request.on('data', function (chunk) {
        data += chunk;
    });
    request.on('end', function () {
        callback(qstring.parse(data));
    });
}