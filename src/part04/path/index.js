"use strict";

const path = require("path");
let fullPath = path.resolve(__dirname, __filename);

// 测试 basename
(() => {
    console.log(path.basename(fullPath) + '\n'); // index.js
})();

// path.dirname
(() => {
    console.log(path.dirname(fullPath)  + '\n'); // d:\Projects\myGitHub\learn-nodejs\src\part04\path // 这是windows目录
    let _path = path.join('lee', 'foo', 'index.js');
    let dirname = path.dirname(_path);
    console.log(dirname + '\n'); // lee\foo
})();

// extname
(() => {
    console.log(path.extname(fullPath)  + '\n'); // .js
})();

// format and parse
(() => {
    let pathObj = path.parse(fullPath);
    let pathStr = path.format(pathObj);
    console.log(pathObj); // 输出的是json {root:"",dir:"",base:"",ext:"",name:""}
    console.log('\n' + pathStr + '\n'); // 输出的是字符串 整个路径
})();

// isAbsolute
(() => {
    let flag = path.isAbsolute(fullPath);
    console.log(flag + '\n'); // true
})();

// path.sep
(() => {
    let sep = path.sep;
    console.log(sep + '\n'); // \ 这是windows分隔符
})();

// path.join
(() => {
    let joined = path.join('foo', 'index.js');
    console.log(joined + '\n'); // foo\index.js
})();