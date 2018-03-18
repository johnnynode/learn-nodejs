var server = require('./server');
var router = require('./router');
var list = require('./router/list');

server.start(router, list);