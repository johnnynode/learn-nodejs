var app = require('express')();

app.use((req, res, next)=>{
  console.log('first middleware');
  next();
});

app.use((req, res, next)=>{
  console.log('second middleware');
  next();
});

app.get('/',(req,res)=>{
  res.send('ok');
});

app.listen('3000', ()=>{
  console.log('server is on 3000');
});