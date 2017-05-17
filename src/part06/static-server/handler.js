"use strict";

const fs = require('fs');
const stat = fs.statSync; // 用于获取文件信息
const path = require('path');
const rootDir = path.resolve(__dirname, 'public');
const template = require('art-template');

// 操作文件夹的方法
function handleDir(url, res) {
    console.log('url');
    console.log(url);
    let dirPath = path.join(rootDir,url);
    fs.readdir(dirPath, (err, files) => {
        if (err) {
            console.log(err.message);
            res.writeHead(301, {
                'Location': '/404.html'
            });
            res.end();
        }

        let container = [];
        files.map((item) => {
            let fullPath = path.join(rootDir, item); // 单个文件的路径
            container.push(item);
            // 获取目录并添加到数组中
            /*
            if (stat(fullPath).isDirectory()) {
                container.push(item);
            }
            */
        });

        // 把数据绑定模板显示
        let templatePath = path.join(__dirname, 'index.html');
        fs.open(templatePath, 'r', (err, fd) => {
            if (err) {
                return res.end(err.message);
            }
            
            let html = template(templatePath, {
                container: container
            });
            // 设置头
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(html); // 响应数据
        })
    });

}

// 操作文件的方法
function handleFile(rootFile, res) {
    // 读取文件内容，响应给客户端
    fs.readFile(rootFile, (err, data) => {
        if (err) {
            console.log(err.message);
            res.writeHead(301, {
                'Location': '/404.html'
            });
            res.end();
        }

        // 读取文件，解析json，然后根据对应的扩展名，找到对应的mime Content-Type
        getContentTypeByExtName(path.extname(rootFile), (err, mime) => {
            if (err) {
                return res.end(err.message);
            }

            // 向客户端发送数据类型的时候，要设置 content-Type
            res.writeHead(200, {
                'Content-Type': mime
            });

            res.end(data); // 发送数据，结束响应
        });
    });
}

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

// 暴露接口
module.exports.handleDir = handleDir;
module.exports.handleFile = handleFile;