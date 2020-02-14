const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static('public2'));
// 通过这个中间件的方法可以解析表单的信息
app.use(bodyParser.urlencoded()); // 只能解析表单enctype的"application/x-www-form-urlencoded"的信息 返回的是json
app.use(bodyParser.json()); // 解析的是json类型的文本，ajax的类型数据, 不能使用上面的urlencoded来解析json类型的ajax数据
app.use(bodyParser.text()); // 解析的是文本类型的数据如：，返回的是text 很不常用
app.use(bodyParser.raw()); // 解析的是二进制提交的数据 很不常用

app.post('/submit', (req, res) => {
    res.send(req.body); // 这里如果是json类型的ajax数据会以小段信息的方式返回到浏览器控制台，而非渲染页面
    // res.send(JSON.parse(req.body.toString())); 这里解析 bodyParser.raw() 提交的数据，是一小段信息，而非渲染页面
});

// 自定义中间件测试完毕
app.listen(3000, function() {
    console.log('server running on port 3000');
});
