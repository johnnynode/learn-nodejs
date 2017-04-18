"use strict";

const fs = require('fs');
const path = require('path');
const fullPath = path.resolve(__dirname, 'index.js');
const fullPath2 = path.join(__dirname, 'index.js');


// 测试验证路径是否存在 exists 已不推荐使用
(() => {
    // 异步操作
    fs.exists(fullPath2, (exists) => {
        console.log('exists: ' + exists); // exists: true
    });

    // 同步验证
    var exists = fs.existsSync(fullPath);
    console.log('sync exists: ' + exists); // sync exists: true
})();

// fs.open
(()=>{
    
})();


// 测试文件信息
(() => {
    
})();

// 测试删除文件
(() => {

})();