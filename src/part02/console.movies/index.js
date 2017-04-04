const fs = require('fs');
const path = require('path');
let arr = [];
let num = 0;

// 加入数组
(() => {
    for (var i = 0; i < 14; i++) {
        arr.push(fs.readFileSync(path.resolve(__dirname, 'frames', (i + 1) + '.txt')));
    }
})();

// 进行读写
(() => {
    setInterval(function () {
        process.stdout.write('\033c'); // 将当前控制台清空
        num++;
        if (num === arr.length) num = 0;
        process.stdout.write(arr[num]);
    }, 1000 / 2);
})();