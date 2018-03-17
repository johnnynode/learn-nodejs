var handler = require('./handler');

var list = {};
list["/"] = handler.home;
list['/home'] = handler.home;
list['/review'] = handler.review;
list['/api/fetch'] = handler.api_fetch;

module.exports = list;