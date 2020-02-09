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

```js

```