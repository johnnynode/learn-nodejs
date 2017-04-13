"use strict";

const fs = require('fs');
const path = require('path');
let filePath = path.resolve(__dirname, 'txt.txt');

// readFile
(() => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return console.log('read err');
        fs.writeFile(filePath, data, 'utf8', (err) => {
            if (err) console.log('write err');
            console.log('write suc');
        })
    });
})();

// readFileSync
(() => {
    let fileContent = fs.readFileSync(filePath, 'utf8');
    let toFilePath = path.resolve(__dirname, 'toTxt.txt');
    let returnVal = fs.writeFileSync(toFilePath, fileContent, 'utf8');
    console.log('返回：' + returnVal); // 返回：undefined 同步写入的返回值是 undefined
})();