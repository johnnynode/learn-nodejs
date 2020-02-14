const express = require('express');
const app = express();
const consolidate = require('consolidate');

app.engine('html', consolidate.ejs); // 对html扩展的解析
app.set('view engine', 'html');
// app.engine('ejs', consolidate.ejs); // 对html扩展的解析
// app.set('view engine', 'ejs');

app.set('views', __dirname + "/views");

// 响应数据
app.get('/', (req, res) => {
    const arr = [1,2,3];
    res.render('home', {name: 'Joh', list: arr, testFun: function(a, b){ return a + b }}); // 第二个参数
});

// 优化响应数据
var dbs = {
    getData:(req, res, next) => {
        const arr = [1,2,3];
        res.locals = {
            name: 'Joh',
            arr,
            testFun: function(a,b) {
                return a + b;
            }
        }
        next();
    }
}

app.get('/test', dbs.getData, (req, res) => {
    res.render('home'); // 第二个参数
});

// 自定义中间件测试完毕
app.listen(3000, function() {
    console.log('server running on port 3000');
});
