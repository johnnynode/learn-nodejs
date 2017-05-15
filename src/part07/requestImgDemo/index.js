"use strict";

const fs = require('fs');
const path = require('path');
const http = require('http');
const server = http.createServer();

server.on('request', function (request, response) {
    let url = request.url;
    console.log('url ' + url);
    if (url === '/') {
        fs.readFile(path.join(__dirname, 'index.html'), function (err, data) {
            if (err) {
                response.writeHead(200, {
                    'Content-Type': 'text/html; charset=utf-8'
                });
                return response.end('对不起，网站正在维护中');
            }
            response.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            });
            response.end(data);
        });

    } else if (url === '/1.png') {
        fs.readFile(path.join(__dirname, '1.png'), function (err, data) {
            if (err) {
                response.writeHead(200, {
                    'Content-Type': 'text/html; charset=utf-8'
                });
                return response.end(err.message);
            }
            response.writeHead(200, {
                'Content-Type': 'image/jpeg' // 静态资源服务器应该按mime类型来设置content-type 之前有
            });
            response.end(data);
        });
    } else if (url === '/2.png') {
        fs.readFile(path.join(__dirname, '2.png'), function (err, data) {
            if (err) {
                response.writeHead(200, {
                    'Content-Type': 'text/html; charset=utf-8'
                });
                return response.end(err.message);
            }
            response.writeHead(200, {
                'Content-Type': 'image/png'
            });
            response.end(data);
        });
    } else {
        let reqPath = path.join(__dirname, url);
        fs.readFile(reqPath, 'utf8', (err, data) => {
        // 请求找不到 去404
        if (err) {
            response.writeHead(302, {
                'Location': '/404.html'
            });
            response.end();
        }
        response.end(data);
        });
    }
});

server.listen(3000, '127.0.0.1', function () {
    console.log('server is running at port 3000...');
});
