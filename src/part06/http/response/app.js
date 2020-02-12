var http = require("http");

//创建服务器
var server = http.createServer(function(req,res){
    //每次接受请求之后做的事情
    //设置响应头
    res.writeHead(200,{"Content-Type":"text/html;charset=UTF8"});
    res.write("<ul>");
    res.write("<li>水果</li>");
    res.write("<li>香蕉</li>");
    res.write("</ul>");
    res.end("成功！"); // 最后必须要end一次
});

server.listen(3000 ,"127.0.0.1");