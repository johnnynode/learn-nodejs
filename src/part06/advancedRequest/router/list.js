var handler = require('./handler');

var list = {};
list["/"] = handler.home;
list['/home'] = handler.home;
list['/review'] = handler.review;
list['/api/fetch'] = handler.api_fetch;
list['/test/query'] = handler.test_query;
list['/test/post'] = handler.test_post;

module.exports = list;