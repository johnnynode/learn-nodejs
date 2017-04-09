"use strict";
const os = require('os');
let args = process.argv;

if (args.length < 4) throw new Error('参数个数不匹配错误，请重新运行');
if (args[2] != 'os') throw new Error('参数错误，必须为os');

let param = args[3];

// 取出json第一个属性的方法
let getFirstAttr = (json) => {
    for (var k in json) return k;
}

switch (param) {
    case 'ip':
        var firstAttr = getFirstAttr(os.networkInterfaces());
        console.log('本机IP地址: ' + os.networkInterfaces()[firstAttr][1]['address']);
        break;
    case 'hostname':
        console.log('主机名：' + os.hostname());
        break;
    case 'freemem':
        console.log('可用内存：' + (os.freemem() / 1024 / 1024 / 1024));
        break;
    default:
        throw new Error('没有找到该选项');
        break;
}