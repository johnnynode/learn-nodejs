var express = require('express');

var app = express();

app.get('/', function (req, res) {
  res.send('home page');
});

app.get('/json', (req,res)=>{
  var json = [
    {
      name:"John"
    },
    {
      name:"Lily"
    }
  ];
  // res.send(json);
  res.json(json);
})

app.listen(3000,"127.0.0.1", function () {
  console.log('server is listening at port 3000');
});