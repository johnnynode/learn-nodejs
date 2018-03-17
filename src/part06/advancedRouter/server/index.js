var http = require('http');
var fs = require('fs');

var startServer = function (router, list) {
  var onRequest = function (req, res) {
    router(list, req.url, res);
  };
  
  var server = http.createServer(onRequest);
  
  server.listen(3000, '127.0.0.1', ()=>{
    console.log('server is on port 3000');
  });
}

module.exports.start = startServer;