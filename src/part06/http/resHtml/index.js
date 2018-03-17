var http = require('http');

var onRequest = function (req,res) {
  console.log('onReq');

  res.writeHead(200,{
    'Content-Type':'text/html'
  });

  var htmlStr = "<h3>Hello John</h3>";

  res.end(htmlStr);
}

var server = http.createServer(onRequest);

server.listen(3000, '127.0.0.1', ()=>{
  console.log('server is on port 3000');
})