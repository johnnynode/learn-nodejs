var express = require('express');
var app = express();

app.set('view engine', 'ejs'); //  模板引擎 1 设置

app.get('/', (req, res) => {
  var data = {
    name:'Joh',
    love:[
      'apple', 'banana', 'pile'
    ]
  };
  res.render('index', {data}); //  模板引擎 2 渲染
});

app.get('/about', (req, res) => {
  res.render('about'); //  模板引擎 2 渲染
});

app.listen(3000, ()=>{
  console.log('server is on 3000 port');
});