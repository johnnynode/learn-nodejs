"use strict";

const fs = require('fs');
const path = require("path");

function formateTrans(arr) {
    var res = [];
    for (var k in arr) {
        var item = arr[k];
        res.push(item.text);
    }
    return res.join(',');
}

function rander(readPath, writePath,outerData) {
    fs.readFile(readPath, 'utf8', (err, data) => {
        if (err) return console.log('read: ' + readPath + ' err!\n');

        // data 是template模板
        let resData = data.replace('<%headerContent%>', formateTrans(outerData.headerArr))
            .replace('<%middleContent%>', formateTrans(outerData.middleArr))
            .replace('<%footerContent%>', outerData.footer);

        // 写入本地文件
        fs.writeFile(writePath, resData, 'utf8', (err) => {
            if (err) return console.log('write ' + writePath + ' err');
            console.log('read and write suc, congratulations!');
        })
    })
}

module.exports = rander;