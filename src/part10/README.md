### 获取url的数据

```js
const express = require('express');
const app = express();
const r1 = express.Router();

r1.get('/test/:x/:y', (req, res) => {
    res.send(
        `
        <ul>
            <li>req.method = ${req.method}</li>
            <li>req.hostname = ${req.method}</li>
            <li>req.originalUrl = ${req.method}</li> <!-- 这里原始路径是url上的路径 -->
            <li>req.protocol = ${req.method}</li>
            <li>req.path = ${req.path}</li>  <!-- 这里的路径是路由路径 -->
            <li>req.query = ${JSON.stringify(req.query)}</li>
            <li>req.params = ${JSON.stringify(req.params)}</li>
        </ul>
        `
    )
})

app.use('/a', r1); // 测试访问：/a/test/x1/y1?name=Joh&age=100

// 自定义中间件测试完毕
app.listen(3000, function() {
    console.log('server running on port 3000');
});

```

### 获取头信息数据

1 ) **关于etag的使用**

```js
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
```

可以测试先/test，再/update，再/test的控制台输出

2 ） **ajax访问测试**

客户端：public目录下index.html文件

```html
<script>
     var xhr = new XMLHttpRequest();
     xhr.open('get', '/testajax', true);
     xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
     xhr.send();
</script>
```

服务器端：

```js
const express = require('express');
const app = express();
const serveStatic = require('serve-static');

app.use(serveStatic('public'));

// 如果是ajax请求，必须在客户端请求头上添加X-Requested-With字段
app.get('/testajax', (req, res) => {
    if(req.xhr) {
        res.send('is xhr: ' + req.xhr); // 此处会在控制台输出而不是，返回的是一小段信息
    } else {
        // res.render(); // 这里处理渲染页面
    }
});

// 自定义中间件测试完毕
app.listen(3000, function() {
    console.log('server running on port 3000');
});
```