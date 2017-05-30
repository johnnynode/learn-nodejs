"use strict";

const fs = require('fs');
const url = require('url');
const path = require('path');
const mime = require('mime');

module.exports = function (req, res, next) {
    let pathname = url.parse(req.url).pathname;
    if (pathname.startsWith('/assets/')) {
        let fullPath = path.join(__dirname, '../' + req.url);
        fs.readFile(fullPath, function (err, data) {
            if (err) {
                console.log('can not find!');
                res.writeHead(404, {
                    'Content-Type': 'text/plain; charset=utf-8'
                });
                return res.end('没找到该资源');
            }

            let mimeType = mime.lookup(fullPath);

            // 处理 text
            if (mimeType.startsWith('text/')) {
                mimeType += '; charset=utf-8';
            }

            res.writeHead(200, {
                'Content-Type': mimeType
            });

            res.end(data);
        });
    } else {
        next();
    }
};