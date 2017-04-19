"use strict";

const fs = require('fs');
const path = require('path');
const fullPath = path.resolve(__dirname, 'index.js');

// 测试文件信息 fs.stat

// 异步方式 fs.stat
fs.stat(fullPath, (err, stats) => {
    if (err) throw err;
    console.log('下面输出 stats 的一些属性：');
    console.log(stats); // 测试stats对象都有什么属性和方法
    console.log('.......');
    // 下面是输出结果：stats的属性
    // dev  
    // mode
    // nlink
    // uid
    // gid
    // rdev
    // blksize
    // ino
    // size
    // blocks
    // atime
    // mtime
    // ctime
    // birthtime
});

// 继续测试stats 通过 for in 输出所有属性和方法

fs.stat(fullPath, (err, stats) => {
    if (err) throw err;
    for (var k in stats) {
        console.log('可用的属性和方法： ' + k);
    }
});

// 经过测试 for in 循环，除了上面的还有如下一些属性和方法：
// _checkModeProperty
// isDirectory 
// isFile
// isBlockDevice
// isCharacterDevice
// isSymbolicLink
// isFIFO
// isSocket

// ------------------------------------------

// 继续测试stats的用法 使用同步方式：fs.statSync

let stats1 = fs.statSync(fullPath); // 当前文件
let stats2 = fs.statSync(__dirname); // 当前目录
let isFile = stats1.isFile(); // 判断是否是文件
let isDir = stats2.isDirectory(); // 判断是否是文件夹

console.log('当前文件是文件类型吗？ ' + isFile); // 当前文件是文件类型吗？ true
console.log('当面目录事文件夹类型吗？ ' + isDir); // 当面目录事文件夹类型吗？ true