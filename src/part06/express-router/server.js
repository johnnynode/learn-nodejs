var express = require('express');

var app = express();

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
})

app.listen(3000, ()=>{
  console.log('server is on 3000 port');
})