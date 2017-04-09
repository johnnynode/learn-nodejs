"use strict";

const os = require('os');
let hostname = os.hostname();
let freemem = os.freemem() / (1024 * 1024 * 1024);
let homedir = os.homedir();
let platform = os.platform();
let release = os.release();
// let tmpDir = os.tmpDir(); //  os.tmpDir() is deprecated
let tmpDir = os.tmpdir();
let totalmem = os.totalmem();
let cpus = os.cpus();
let cpusnum = os.cpus().length;
let network = os.networkInterfaces();
let arch = os.arch();

console.log("\n" + "主机名：" + hostname + "\n");
console.log("可用内存：" + freemem + "\n");
console.log("用户目录：" + homedir + "\n");
console.log("系统平台：" + platform + "\n");
console.log("系统版本：" + release + "\n");
console.log("应用程序临时目录：" + tmpDir + "\n");
console.log("总内存大小： " + totalmem + "\n");
console.log("cpu信息：\n");
console.log(cpus);
console.log("\n" + "cpu核心：" + cpusnum + "\n");
console.log("网络信息：\n");
console.log(network);
console.log("\n" + "架构：" + arch); // x64 or x32