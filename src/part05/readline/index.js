"use strict";

// 该模块专门用来处理按照行读取的方式
const readline = require('readline'); // 此模块属系统模块
const path = require('path');
const fs = require('fs');
const filePath = path.join(__dirname,'salary.txt');
const distPath = path.join(__dirname,'dist.txt');

// 创建一个要读取的流接口
const rl = readline.createInterface({
  input: fs.createReadStream(filePath)
});

// 每次读取一行就触发一次line事件,line回调函数中的line就是当前的行内容
rl.on('line', (line) => {
  fs.appendFile(distPath, line + '\n', (err) => {
    if (err) throw err;
  });
});

rl.on('close', ()=> {
  console.log('readline copy over!');
});