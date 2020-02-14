"use strict";

const request = require('request');

// 测试 baidu
(() => {
    console.time('b');
    request('baidu.com', () => {
        console.timeEnd('b');
    });
})();

// 测试 taobao
(() => {
    console.time('a');
    request('taobao.com', () => {
        console.timeEnd('a');
    })
})();

// 测试 qq
(() => {
    console.time('t');
    request('qq.com', () => {
        console.timeEnd('t');
    });
})();

// 经过代码的修改和测试，发现在放在最后的一组请求总是最快的，比如现在的qq, 用时最少