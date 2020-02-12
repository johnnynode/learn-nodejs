/**
 * Created by Danny on 2015/9/20 15:35.
 */
var http = require("http");
var querystring = require("querystring");
var fs = require('fs');

//创建服务器
var server = http.createServer(function(req,res){
    console.log(req.url);
    if(req.url == '/') {
        fs.createReadStream(__dirname + '/index.html', 'utf8').pipe(res);
    }
    //如果你的访问地址是这个，并且请求类型是post
    if(req.url == "/dopost" && req.method.toLowerCase() == "post"){
        var alldata = "";
        //下面是post请求接收的一个公式
        //node为了追求极致，它是一个小段一个小段接收的。
        //接受了一小段，可能就给别人去服务了。防止一个过大的表单阻塞了整个进程
        req.addListener("data",function(chunk){
            alldata += chunk;
        });
        //全部传输完毕
        req.addListener("end",function() {
            console.log('alldata');
            console.log(alldata);
            res.end("success");
            //将datastring转为一个对象
            var dataObj = querystring.parse(alldata);
            console.log(dataObj); // 显然这种情况是无法正常处理 这类 multipart/form-data 类型的表单数据的
            /*
            console.log(dataObj.name);
            console.log(dataObj.sex);
            console.log(dataObj.hobby);
            console.log(dataObj.tupian);
            */
        });
    }

    if(req.url == "/dopost2" && req.method.toLowerCase() == "post"){
        var alldata = "";
        //下面是post请求接收的一个公式
        //node为了追求极致，它是一个小段一个小段接收的。
        //接受了一小段，可能就给别人去服务了。防止一个过大的表单阻塞了整个进程
        req.addListener("data",function(chunk){
            alldata += chunk;
        });
        //全部传输完毕
        req.addListener("end",function() {
            console.log('alldata');
            console.log(alldata);
            res.end("success");
            //将datastring转为一个对象
            var dataObj = querystring.parse(alldata); // 处理类似name=Joh&sex=%E7%94%B7这类数据
            // console.log(dataObj);
            console.log(dataObj.name);
            console.log(dataObj.sex);
        });
    }
});

server.listen(3000,"127.0.0.1");