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

