"use strict";

(() => {
    console.log("测试 process.argv");
    console.log(process.argv);
    console.log('\n');

    console.log("测试 process.env");
    console.log(process.env);
    console.log('\n'); 

    console.log("测试 process.pid");
    console.log(process.pid);
    console.log('\n'); 

    console.log("测试 process.platform");
    console.log(process.platform);
    console.log('\n'); 

    console.log("测试 process.version");
    console.log(process.version); // 这里输出的是node的版本
    console.log('\n'); 

    console.log("测试 process的 各大属性");
    console.log("process.stdout : ");
    console.log(process.stdout);
    console.log('\n'); 

    console.log("process.stdin : ");
    console.log(process.stdin);
    console.log('\n'); 

    console.log("process.stderr : ");
    console.log(process.stderr);
    console.log('\n'); 
})();