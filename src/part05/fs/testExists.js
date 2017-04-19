"use strict";

const fs = require('fs');
const path = require('path');
const fullPath = path.resolve(__dirname, 'index.js');

// 注意：测试验证路径是否存在 exists api 已不推荐使用 (NOT RECOMMENDED)

// 异步操作
fs.exists(fullPath, (exists) => {
    console.log('exists: ' + exists); // exists: true
});

// 同步操作
let exists = fs.existsSync(fullPath);
console.log('sync exists: ' + exists); // sync exists: true