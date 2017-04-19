"use strict";

const fs = require('fs');
const path = require('path');
let fullPath1 = path.join(__dirname, 'myfile1.txt');
let fullPath2 = path.join(__dirname, 'myfile2.txt');

// fs.open 通过第二个参数的传递来确定是读还是写。

// write
fs.open(fullPath1, 'wx', (err, fd) => {
    if (err) {
        if (err.code === "EEXIST") return console.error('myfile1 already exists');
        throw err;
    }
    console.log('do your write operation!'); // 然后可以做写文件操作了。
});

// read
fs.open(fullPath2, 'r', (err, fd) => {
    if (err) {
        if (err.code === "ENOENT") return console.error('myfile2 does not exist');
        throw err;
    }
    console.log('do your read operation!');
});