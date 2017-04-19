"use strict";

const fs = require('fs');
const path = require('path');
const fullPath = path.resolve(__dirname, 'myfile.js');

// 用于验证路径所代表的文件或目录的用户权限
// 不推荐在fs.open(), fs.readFile() or fs.writeFile()之前调用

// 详见API : 
// https://nodejs.org/dist/latest-v6.x/docs/api/fs.html#fs_fs_access_path_mode_callback
fs.writeFileSync(fullPath);
fs.access(fullPath, fs.constants.R_OK | fs.constants.W_OK, (err) => {
  console.log(err ? 'no access!' : 'can read/write');
});