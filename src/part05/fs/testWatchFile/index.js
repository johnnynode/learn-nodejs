"use strict";

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'test.txt');

// 在WS中，要想看到效果，要按Ctrl+S给watch发送一个信号
fs.watchFile(filePath, {
  persistent: true,
  interval: 500
}, (curr, prev) => {
  console.log(`当前文件修改时间: ${curr.mtime}`);
  console.log(`上一次文件修改时间: ${prev.mtime}`);
});