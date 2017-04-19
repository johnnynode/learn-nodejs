"use strict";

const fs = require('fs');
const path = require('path');
const fullPath = path.resolve(__dirname, 'index.js');

// 测试删除文件 fs.unlink  fs.unlinkSync

(() => {
    let writePath = path.join(__dirname, 'writeTest.txt'); // 首先创建一个文件，然后再删除
    fs.writeFileSync(writePath, 'hello', 'utf8'); // 同步创建一个文件
    fs.unlink(writePath, (err) => {
        if (err) throw err;
        console.log('delete suc!');
    });
})();

// fs.unlinkSync
(() => {
    // 复制上面的代码做同样的操作
    let writePath = path.join(__dirname, 'writeTestc.txt'); // 首先创建一个文件，然后再删除
    fs.writeFileSync(writePath, 'hello', 'utf8'); // 同步创建一个文件
    console.log('unlinkSync before....');
    fs.unlinkSync(writePath); // return undefined 此处如果同步删除不存在的路径文件会报错!!! Beware!
    console.log('unlinkSync after...');
})();