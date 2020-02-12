var express = require('express');
var app = express();

// express 内置的静态文件服务器,指定服务器根目录是public, like visit: /images/github.jpg
app.use(express.static('public')); 

app.listen('3000', ()=>{
  console.log('server is on 3000');
});