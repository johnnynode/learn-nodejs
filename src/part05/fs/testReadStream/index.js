"use strict";

const fs = require('fs');
const path = require('path');
const srcPath = path.join(__dirname,'src.txt');
const distPath = path.join(__dirname,'dist.txt');

let readStream = fs.createReadStream(srcPath); // 创建一个文件读取流
let writeStream = fs.createWriteStream(distPath); // 创建一个文件写入流

// 读取流的data事件会源源不断的被触发
readStream.on('data',(chunk)=>{
    writeStream.write(chunk);
});

// 拷贝完成触发end事件
readStream.on('end', function () {
  console.log('拷贝结束');
});