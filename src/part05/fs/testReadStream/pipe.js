"use strict";

const fs = require('fs');
const path = require('path');
const srcPath = path.join(__dirname,'src.txt');
const distPath = path.join(__dirname,'dist.txt');

let readStream = fs.createReadStream(srcPath); // 创建一个文件读取流
let writeStream = fs.createWriteStream(distPath); // 创建一个文件写入流

// 文件流是异步，系统内部的pipe更加高效
readStream.pipe(writeStream);

// 拷贝完成触发end事件
readStream.on('end', ()=>{
    console.log('拷贝结束');
});