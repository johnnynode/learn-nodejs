"use strict";
const fs = require('fs');
const path = require('path');
let filePath = path.resolve(__dirname, 'txt.txt');

// 执行区域：
testReadFile();
testReadFileSync();

// readFile
function testReadFile() {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return console.log('read err');
        fs.writeFile(filePath, data, 'utf8', (err) => {
            if (err) console.log('write err');
        })
    });
}

// readFileSync
function testReadFileSync() {
    let fileContent = fs.readFileSync(filePath, 'utf8');
    let toFilePath = path.resolve(__dirname, 'toTxt.txt');
    let returnVal = fs.writeFileSync(toFilePath, fileContent, 'utf8');
    console.log('返回：' + returnVal); // 返回：undefined
}