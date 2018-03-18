var express = require('express');

var app = express();

app.get('/', function (req, res) {
  res.send('home page');
});

app.listen(3000,"127.0.0.1", function () {
  console.log('server is listening at port 3000');
});