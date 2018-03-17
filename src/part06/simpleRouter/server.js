var http = require('http');
var fs = require('fs');
var route = require('./route');

var startServer = function () {
  var onRequest = function (req,res) {
    var url = req.url;
    route.start(url, res);
  };
  
  var server = http.createServer(onRequest);
  
  server.listen(3000, '127.0.0.1', ()=>{
    console.log('server is on port 3000');
  });
}

module.exports.start = startServer;