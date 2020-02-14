"use strict";

process.nextTick(() => {
    console.log("程序退出前");
    process.exit(1);
});

process.on('exit', () => {
    console.log("程序退出");
})