"use strict";

const fs = require('fs');
const path = require('path');
const fullPath = path.resolve(__dirname, 'index.js');

// 测试验证路径是否存在 exists 已不推荐使用 (NOT RECOMMENDED)
(() => {
    // 异步操作
    fs.exists(fullPath, (exists) => {
        console.log('exists: ' + exists); // exists: true
    });

    // 同步验证
    let exists = fs.existsSync(fullPath);
    console.log('sync exists: ' + exists); // sync exists: true
})();

// fs.open 通过第二个参数的传递来确定是读还是写。
(() => {
    let fullPath1 = path.join(__dirname, 'myfile.txt');
    let fullPath2 = path.join(__dirname, 'myfile2.txt');
    // write
    fs.open(fullPath, 'wx', (err, fd) => {
        if (err) {
            if (err.code === "EEXIST") return console.error('myfile already exists');
            throw err;
        }
        console.log('do your write operation!'); // 然后可以做写文件操作了。
    });

    // read
    fs.open(fullPath2, 'r', (err, fd) => {
        if (err) {
            if (err.code === "ENOENT") return console.error('myfile does not exist');
            throw err;
        }
        console.log('do your read operation!');
    });
})();

// 测试文件信息 fs.stat
(() => {
    let fullPath = path.join(__dirname, 'index.js');
    // 异步方式 fs.stat
    fs.stat(fullPath, (err, stats) => {
        if (err) throw err;
        console.log('下面输出 stats 的一些属性：');
        console.log(stats); // 测试stats对象都有什么属性和方法
        console.log('.......'); // 
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

    

})();

// 继续测试stats的用法
(() => {
    
})();

// 同步方式 fs.statSync

// 测试删除文件
(() => {

})();