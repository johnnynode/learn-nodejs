var fs = require('fs');

function route(handle, pathname, res) {
    if (typeof handle[pathname] === 'function') {
        handle[pathname](res);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        fs.createReadStream(__dirname + '/../views/404.html', 'utf8').pipe(res);
    }
}

module.exports = route;