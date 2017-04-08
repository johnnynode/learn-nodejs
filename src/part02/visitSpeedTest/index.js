const request = require('request');

// 简单的测试就可以
testTaoBao();
testQQ();
testBaidu();

function testTaoBao() {
    console.time('t');
    request('taobao.com', () => {
        console.timeEnd('t');
    })
}

function testQQ() {
    console.time('q');
    request('qq.com', () => {
        console.timeEnd('q');
    });
}

function testBaidu() {
    console.time('b');
    request('baidu.com', () => {
        console.timeEnd('b');
    });
}