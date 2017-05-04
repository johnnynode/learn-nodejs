"use strict";

const http = require('http'); // 加载http核心模块
const server = http.createServer(); // 通过http核心模块暴露的createServer方法得到一个服务器实例
const FOO = 'bar';

server.on('request', function (request, response) {
    console.log('request.headers');
    console.log(request.headers);
    console.log('----------');
    console.log(`客户端使用的http版本: ${request.httpVersion}`);

    // 在url地址栏中，只要输入地址敲回车，就是GET请求
    console.log(`客户端请求方法：${request.method}`);

    // 获取客户单请求路径,根据客户端请求的不同的url响应不同的内容
    console.log(`客户端请求方法：${request.url}`);

});

// 4. 开启服务器，设置可监听的IP和端口号
server.listen(3000, '127.0.0.1', function () {
    console.log('server is running ar port 3000');
});
