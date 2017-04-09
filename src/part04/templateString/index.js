"use strict";

(() => {
    let foo = "hello";
    let res = `
        ${foo}
        ${getWorld()} 
        \n
        ${foo}`
    function getWorld() {
        return "world";
    }
    console.log("res：");
    console.log(res);
})();
/*
输出结果为：
res：

    hello
    world 
    
    hello
 */

(() => {
    let num = 1;
    let res = String.raw`${num + 2}haha`;
    console.log(res); // 3haha
})();