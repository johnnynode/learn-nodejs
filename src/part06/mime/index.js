"use strict";

const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {
    let url = req.url; // 拿到客户端请求的url路径
    // 如果用户的请求路径中没有点，那么给它返回一个默认的页面
    if (!url.includes('.')) {
        url = 'index.html';
    }

    let absPath = path.join(__dirname, url);  // 得到用户请求路径的绝对路径

    // 读取文件内容，响应给客户端
    fs.readFile(absPath, (err, data) => {
        if (err) {
            return res.end(err.message); // 如果发生异常，直接将错误消息发送给客户端或者返回个错误页
        }

        // 读取文件，解析json，然后根据对应的扩展名，找到对应的mime Content-Type
        getContentTypeByExtName(path.extname(absPath), (err, mime) => {
            if (err) {
                return res.end(err.message);
            }

            // 向客户端发送数据类型的时候，要设置 content-Type
            res.writeHead(200, {
                'Content-Type': mime
            });

            // 发送数据，结束响应
            res.end(data);
        });
    });

}).listen(3000, '127.0.0.1', () => {
    console.log('server is running at port 3000');
});

// 通过请求的后缀名来返回不同的 contentType
function getContentTypeByExtName(extName, callback) {
    fs.readFile(path.join(__dirname, 'mime.txt'), 'utf8', function (err, data) {
        if (err) {
            return callback(err, null);
        }
        try {
            let jsonObj = JSON.parse(data);
            callback(null, jsonObj[extName] ? jsonObj[extName] : 'text/plain');
        } catch (e) {
            callback(e, null);
        }
    });
}