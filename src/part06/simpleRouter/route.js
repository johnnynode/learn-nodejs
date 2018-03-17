var fs = require('fs');

function routeHandler(url, res) {
  if(url === '/' || url === '/home') {
    res.writeHead(200,{
      'Content-Type':'text/html'
    });
    fs.createReadStream(__dirname + '/views/index.html', 'utf8').pipe(res);
  } else if(url === '/review') {
    res.writeHead(200,{
      'Content-Type':'text/html'
    });
    fs.createReadStream(__dirname + '/views/review.html', 'utf8').pipe(res);
  } else if(url === '/api/fetch') {
    res.writeHead(200,{
      'Content-Type':'application/json'
    });
    var json = {
      name:'Johnny',
      age: 26,
      job: 'engineer'
    }
    res.end(JSON.stringify(json));
  } else {
    // 404
    res.writeHead(200,{
      'Content-Type':'text/html'
    });
    fs.createReadStream(__dirname + '/views/404.html', 'utf8').pipe(res);
  }
}

module.exports.start = routeHandler;