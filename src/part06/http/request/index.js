"use strict";

const http = require('http'); // 加载http核心模块
const server = http.createServer(); // 通过http核心模块暴露的createServer方法得到一个服务器实例

// 一个小案例来测试：通过用户请求不同的url，来返回不同的信息
server.on('request', function (req, res) {
    let url = req.url;
    if(url === '/'){
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        // res.setHeader('X-Foo', 'bar'); // just for test 目的是测试可以在header对象中挂载东西
        // res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'}); // more powerful
        res.end('欢迎!');
    }else if(url === '/headers'){
        res.end(JSON.stringify(req.headers)); 
    }else if(url === '/version'){
        res.end(req.httpVersion); // 1.1
    }else if(url === '/method'){
        res.end(req.method); // GET
    }else if(url === '/url'){
        res.end(req.url); // /url
    }else{
        res.end('error'); // error
    }
});

// 4. 开启服务器，设置可监听的IP和端口号
server.listen(3000, '127.0.0.1', function () {
    console.log('server is running at port 3000');
});