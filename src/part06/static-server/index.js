"use strict";

const http = require('http');
const server = http.createServer();
const fs = require('fs');
const path = require('path');

const template = require('art-template');

server.on('request', function (req, res) {
    let url = req.url;
    console.log('url');
    console.log(url);
    if (url === '/') {
        fs.readdir(path.join(__dirname, 'public'), (err, files) => {
            if (err) throw err;
            let container = []; // all dirs 
            files.forEach((item) => {
                let filePath = path.join(__dirname, 'public', item);
                let isDir = fs.statSync(filePath).isDirectory();
                container.push({
                    src: filePath,
                    name: item,
                    type: isDir ? 'dir' : 'file'
                });
            })
            // 读取index.html文件,并经过渲染之后返回
            let indexFile = path.join(__dirname, 'index.html');
            let html = template(indexFile, {
                container: container
            });
            // 设置头
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(html);
        })
    }else{
        let reqPath = path.join(__dirname,url);
        console.log('reqPath');
        console.log(reqPath);

        fs.readFile(reqPath,'utf8',(err,data)=>{
            if(err) throw err;
            res.end(data);
        });
    }
});

server.listen(3000, '127.0.0.1', () => {
    console.log('server is running at port 3000');
});