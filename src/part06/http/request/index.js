"use strict";

const http = require('http'); // 加载http核心模块
const server = http.createServer(); // 通过http核心模块暴露的createServer方法得到一个服务器实例

server.on('request', function (req, res) {
    let url = req.url;
    if(url === '/'){
        // 返回整个request对象
        // res.end('您正在请求的是：' + '\n' + JSON.stringify(req));
        // console.log(req);
        var json = {name:1};
        // var str = JSON.stringify(req);
        // console.log(str);
        res.end(req);
    }
    return;
    console.log('request.headers');
    console.log(request.headers);
    console.log('----------');
    console.log(`客户端使用的http版本: ${request.httpVersion}`);

    // 在url地址栏中，只要输入地址敲回车，就是GET请求
    console.log(`客户端请求方法：${request.method}`);

    // 获取客户单请求路径,根据客户端请求的不同的url响应不同的内容
    console.log(`客户端请求url：${request.url}`);
    response.end('Now you are requesting ：' + `${request.url}`);

});

// 4. 开启服务器，设置可监听的IP和端口号
server.listen(3000, '127.0.0.1', function () {
    console.log('server is running ar port 3000');
});
