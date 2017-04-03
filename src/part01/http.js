var http = require('http');
var count = 0;
http.createServer(function(req,res){
    console.log(req.url); // 会输出2个结果 一个是 /favicon  一个是/

    /* 下面这段代码是过滤默认请求的收藏家图标 */
    if(req.url === '/favicon.ico'){
        return res.end(); // 很快就过去了
    }

    res.writeHead(200,{
        'Content-Type':'text/html;charset=utf-8'
    });
    res.end('hello world! Me ' + (++ count));

}).listen(3000,'localhost');