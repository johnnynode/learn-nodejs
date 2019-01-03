### 常用的内置api

#### http 网络请求

- `let server = http.createServer((req, res)=>{})` 创建一个服务器 返回一个server对象
- `server.listen(1234);` // 监听端口 每个端口都有特殊用途，自己来定义
- res  request 请求 浏览器等输入
- req  reponse 响应 输出-输出到浏览器等
- `req.url` 请求的地址，绝对路径 默认会请求一个多余的 `/favicon.ico` (chrome行为)
- `res.write();` 发送东西
- `res.end();` 结束请求

#### fs 文件操作

- `fs.readFile(filepath, (err, data)=>{}, )` 参数列表：文件名, 回调函数 ... [读文件]
- `fs.writeFile()` 参数列表：文件名, 内容, 回调 ...  [写文件]
- 错误优先处理 err 优先判断
- data 文件数据，转成文字 `data.toString()` 方便人调试

#### querystring 获取get参数

原始做法:

```javascript
const http = require('http');
http.createServer((req, res)=>{
  let getParams = {};
  let url = '';
  if(req.url.indexOf('?') != -1) {
    let arr1 = req.url.split('?');
    url = arr[0]; // 地址
    let arr2 = arr[1].split('&'); // 数组型参数 ['user=blue', 'pass=123']
    for(var i=0; i < arr.length; i++) {
      let item = arr2[i].split('=');
      getParams[item[0]] = item[1]; // 保存成 key value 键值对
    }
  } else {
    url = req.url;
  }
  console.log(url);
  console.log(getParams);
  res.write('111');
  res.end();
});
http.listen(8080);
```

querystring 改造后的结果：

```javascript
const http = require('http');
const querystring = require('querystring');

http.createServer((req, res)=>{
  let getParams = {};
  let url = '';
  if(req.url.indexOf('?') != -1) {
    let arr1 = req.url.split('?');
    url = arr[0]; // 地址
    getParams = querystring.parse(arr[1]);
  } else {
    url = req.url;
  }
  console.log(url);
  console.log(getParams);
  res.write('111');
  res.end();
});
http.listen(8080);

// 注意： querystring 只能解析 xx=1&yy=2 这种不带？的
// 而下面的 url模块可以直接处理，比querystring模块更强大

```

#### 比querystring更方便的形式 url 模块 获取get参数

关键代码：

```javascript
const urlLib = require('url');
// true 参数会把query部分从字符串转换为对象
let result = urlLib.parse('http://www.baidu.com?wd=1&x=1', true) 
console.log(result.query); // wd=1&x=1 => {wd:1,x:1}
console.log(result.pathname); // url 地址
```

完整代码：

```javascript
const http = require('http');
const urlLib = require('url');

http.createServer((req, res)=>{
  let obj = urlLib.parse(req.url, true);
  let url = obj.pathname;
  let getParams = obj.query;
  console.log(url, getParams);
  res.write('111');
  res.end();
});
http.listen(8080);

```

####  处理post数据 

```javascript
const http = require('http');
const querystring = require('querystring');

// 简单处理一个字符串类型的post数据请求
http.createServer((req, res)=>{
  let str = ''; // 用于接收数据

  // post 数据很大，比如 1G , 需要以流的形式处理
  // data 事件会多次触发
  req.on('data', (data)=>{
    str += data;
  });
  // end 事件 当数据全部到达时使用
  req.on('end', ()=>{
    console.log(str); // 最终的全部字符串 xx=1&yy=2&&wd=3
    let result = querystring.parse(str);
    console.log(result); // 对象 {xx:1, yy:2, wd:3}
  });

  res.write('111');
  res.end();
});
http.listen(8080);
```
