"use strict";

const fs = require("fs");
const path = require("path");

const parse = require('./parse'); // 引入自定义parse模块
const rander = require('./rander'); // 引入自定义rander模块

let url = 'http://127.0.0.1:3000/sample.html'; // 首先应该起一个服务器用于将sample文件以http的形式访问。
let readPath = path.resolve(__dirname, 'template.html'); // 读取模板的路径
let writePath = path.resolve(__dirname, 'output.html'); // 写入模板的路径

// 开始解析并且渲染
parse(url, (err, data) => {
    if (err) return console.log('parse 时出错： ' + err);
    rander(readPath, writePath, data);
});
