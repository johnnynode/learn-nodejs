var http = require('http')
var url = require('url');
var fs = require('fs');

var startServer = function (router, list) {
  var onRequest = function (req, res) {
    var pathname = url.parse(req.url).pathname;
    var query = url.parse(req.url, true).query;
    router(list, pathname, res, query);
  };
  
  var server = http.createServer(onRequest);
  
  server.listen(3000, '127.0.0.1', ()=>{
    console.log('server is on port 3000');
  });
}

module.exports.start = startServer;