"use strict";

const fs = require('fs');
const path = require('path');
const iconv = require('iconv-lite');

const src = path.join(__dirname, 'test.txt');
const dist = path.join(__dirname, 'dist.txt');

fs.readFile(src, 'utf8', (err, data) => {
    if (err) throw err;
    // iconv的decode方法就可以用来解码，需指定一个原始的二进制数据和字符集编码
    let res = iconv.decode(data, 'gbk');
    fs.writeFile(dist, res, (err)=>{
        if (err) throw err;
    });
});