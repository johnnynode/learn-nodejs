#### fs 文件操作

- `fs.readFile(filepath, (err, data)=>{}, )` 参数列表：文件名, 回调函数 ... [读文件]
- `fs.writeFile()` 参数列表：文件名, 内容, 回调 ...  [写文件]
- 错误优先处理 err 优先判断