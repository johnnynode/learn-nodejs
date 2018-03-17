var http = require('http');

var onRequest = function (req,res) {
  console.log('onReq');

  res.writeHead(200,{
    'Content-Type':'text/pain'
  });

  res.end('Hello from server');
}

var server = http.createServer(onRequest);

server.listen(3000, '127.0.0.1', ()=>{
  console.log('server is on port 3000');
})