var fs = require('fs');

function home(res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream(__dirname + '/../views/index.html', 'utf8').pipe(res);
}

function review(res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream(__dirname + '/../views/review.html', 'utf8').pipe(res);
}

function api_fetch(res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var json = {
      name:'Johnny',
      age: 26,
      job: 'engineer'
    }
    res.end(JSON.stringify(json));
}

module.exports = {
    home: home,
    review: review,
    api_fetch: api_fetch
}