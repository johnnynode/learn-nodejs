const express = require('express');
const app = express();
const serveStatic = require('serve-static');

app.use(serveStatic('public'));

// 如果是ajax请求，必须在客户端请求头上添加X-Requested-With字段
app.get('/testajax', (req, res) => {
    if(req.xhr) {
        res.send('is xhr: ' + req.xhr); // 此处会在控制台输出而不是，返回的是一小段信息
    } else {
        res.render(); // 这里处理渲染页面
    }
    
});

// 自定义中间件测试完毕
app.listen(3000, function() {
    console.log('server running on port 3000');
});
