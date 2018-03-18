var express = require('express');
var bodyParser = require('body-parser');

var app = express();
// app.use(bodyParser.urlencoded({extended:false})); // 只能处理url上的，不能处理json
app.use(bodyParser.json()); // 处理json形式的post

app.get('/', (req, res) => {
  console.dir(req.query);
  res.send("home page");
});

app.post('/', (req, res) => {
  console.dir(req.body);
  res.send(req.body);
});

app.get('/profile/:id', (req, res) => {
  console.dir(req.params);
  res.send("profile page, id: " + req.params.id);
});

app.get('/multiprofile/:id/user/:u', (req, res) => {
  console.dir(req.params);
  res.send("profile page, id: " + req.params.id + " user: " + req.params.u);
});

// like abcd , acd // ? 0 or 1 b
app.get('/ab?cd', (req, res) => {
  res.send('/ab?cd');
});

// query like: /test/query?find=hot&sort=1
app.get('/test/query', (req, res) => {
  var json = req.query;
  res.send(json);
});

app.listen(3000, ()=>{
  console.log('server is on 3000 port');
});