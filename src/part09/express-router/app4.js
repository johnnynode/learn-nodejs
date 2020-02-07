const express = require('express');
const app = express();
const router = express.Router();

// use 要在 http动词之上，否则http动词收不到, 此处可以在第一个参数上加上路由，可以省略 '/'
app.use('/', (req, res, next)=>{
    req.name = 'Johj';
    next();
});

app.use('/mo', router);

app.use('/mo', (req, res, next)=>{
    req.name = 'iamo';
    next();
});

app.get('/', (req, res)=>{
    res.send('hello ' + req.name);
});

app.get('/test', (req, res)=>{
    res.send('test ' + req.name);
});

app.get('/mo', (req, res)=>{
    res.send('mo ' + req.name);
});

// 访问 /mo/xy 可以输出req.name
router.get('/xy', (req, res)=>{
    res.send('xy: ' + req.name);
});

// http动词的 all 可以接受任意类型的请求方式
app.all('/testall', (req, res)=>{
    res.send('test all !!')
});

// 同理 router也有类似的all使用 /mo/testall
router.get('/testall', (req, res) => {
    res.send('mo test all');
});

app.listen(3000);