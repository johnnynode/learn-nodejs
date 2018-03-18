var http = require('http')
var url = require('url');
var fs = require('fs');
var querystring = require('querystring');

var startServer = function (router, list) {
  var onRequest = function (req, res) {
    var method = req.method;
    var pathname = url.parse(req.url).pathname;
    
    var data = [];
    req.on("error", function(err) {
        console.error(err);
    }).on("data", function(chunk) {
        data.push(chunk);
    }).on('end', function() {
        if (method === "POST") {
          if(data.length > 1e6) {
            console.log('too much post, server will close it');
            return req.connection.destroy();
          }
          data = Buffer.concat(data).toString();
          var params = querystring.parse(data);
          router(list, pathname, res, params);
        } else if(method === "GET") {
          var query = url.parse(req.url, true).query; // true json, false string here
          router(list, pathname, res, query);
        }
    });
  };
  
  var server = http.createServer(onRequest);
  
  server.listen(3000, '127.0.0.1', ()=>{
    console.log('server is on port 3000');
  });
}

module.exports.start = startServer;