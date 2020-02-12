var app = require('express')();

// 第二个参数(回调函数)是最简单的中间件 , 中间件就是在请求和相应之间的程序
app.get('/', (req, res) => {
  res.send('ok');
});

app.listen('3000', ()=>{
  console.log('server is on 3000');
});