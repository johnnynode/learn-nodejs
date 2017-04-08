"use strict";


testSetImmediate(); // 2
testSetTimeout(); // 1
testProcessNextTick(); // 3
console.log(4);

function testSetTimeout() {
    setTimeout(() => {
        console.log(1);
    });
}

function testSetImmediate() { 
    setImmediate(() => {
        console.log(2);
    })
};

function testProcessNextTick() {
    process.nextTick(() => {
        console.log(3);
    });
};

/*
output:
4
3
1
2

异步执行顺序是：
process.nextTick (优先级高)
setTimeout
setImmediate 最后执行。

 */