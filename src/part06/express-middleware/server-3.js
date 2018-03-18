var app = require('express')();

app.use((req, res, next)=>{
  console.log('first middleware');
  next();
});

app.use((req, res, next)=>{
  console.log('second middleware');
  res.end('hello'); // 此处没有调用next，将会暂停传递，后面的不会再执行, 不管请求什么路由，都会输出hello
});

app.get('/',(req,res)=>{
  res.send('ok');
});

app.listen('3000', ()=>{
  console.log('server is on 3000');
});