const express = require('express');
const app = express();

let eTagVersion = 100;

// 测试服务器版本是否变动过, 用于减轻服务器的请求
function freshHandle(req, res, next) {
    res.set('etag', eTagVersion);
    console.log('req.fresh: ', req.fresh);
    // console.log('req.stale: ', req.stale);
    if(req.fresh) {
        res.send(); // 如果是新鲜的，此时就会是304, send中写什么都不会改变响应客户端的内容，但必须要res.send一次
    } else {
        next();
    }
}

app.get('/test', freshHandle, (req, res) => {
    res.send('version: ' + eTagVersion);
});

app.get('/update', (req, res) => {
    ++eTagVersion;
    res.send('update');
})

// 自定义中间件测试完毕
app.listen(3000, function() {
    console.log('server running on port 3000');
});
