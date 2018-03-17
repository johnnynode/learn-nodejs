var http = require('http');
var fs = require('fs');

var startServer = function () {
  var onRequest = function (req,res) {
    res.writeHead(200,{
      'Content-Type':'text/html'
    });
  
    var myReadStream = fs.createReadStream(__dirname + '/index.html', 'utf8');
    myReadStream.pipe(res);
  }
  
  var server = http.createServer(onRequest);
  
  server.listen(3000, '127.0.0.1', ()=>{
    console.log('server is on port 3000');
  });
}

module.exports.start = startServer;