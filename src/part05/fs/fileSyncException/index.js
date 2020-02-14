"use strict";

const path = require('path');
const fs = require('fs');

// 封装一个方法
function readFileSync(filePath, code) {
    let flag = true;
    let data = '';
    try {
        data = fs.readFileSync(filePath, code || 'utf8');
    } catch (e) {
        flag = false;
    } finally{
        if (!flag) return console.log('文件读取失败');
        console.log('文件读取完成: ');
        console.log(data);
    }
}

// 成功读取文件
let sucPath = path.resolve(__dirname, 'txt.txt');
readFileSync(sucPath, 'utf8');

// 错误读取
let failPath = path.resolve(__dirname, 'wrongfile.txt'); // 不存在的地址
readFileSync(failPath);