const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser());

// 响应数据
app.get('/', (req, res) => {
    res.send(req.cookies);
});

// 设置cookie
app.get('/add', (req, res) => {
    var name = req.query.name;
    var val = req.query.val;

    res.cookie(name, val);
    res.redirect('/');
});

// 删除cookie
app.get('/remove', (req, res) => {
    res.clearCookie("name");
    res.clearCookie("val");
    res.redirect("/");
});

// 自定义中间件测试完毕
app.listen(3000, function() {
    console.log('server running on port 3000');
});
