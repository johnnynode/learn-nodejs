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

// handle like /test/query?name=1&ss=2332
function test_query(res, params) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(params));
}

function test_post(res, params) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(params));
}

module.exports = {
    home,
    review,
    api_fetch,
    test_query,
    test_post
}