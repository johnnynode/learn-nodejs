var express = require('express');
var app = express();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.listen('3000', ()=>{
  console.log('server is on 3000');
});