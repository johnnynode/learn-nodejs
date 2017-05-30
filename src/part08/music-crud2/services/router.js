"use strict";

const fs = require('fs');
const path = require('path');
const url = require('url');
const qstring = require('querystring');
const _ = require('underscore');
const handler = require('./handler');

// 用来匹配url的正则
const regex_remove = /^\/remove\/(\d{1,6})$/;
const regex_edit = /^\/edit\/(\d{1,6})$/;

module.exports = function (req, res) {
    let urlObj = url.parse(req.url);
    let pathname = urlObj.pathname;
    let method = req.method;

    if (pathname === '/') {
        handler.showIndex(req, res); // 展示首页
    } else if (pathname === '/getJson') {
        handler.getMusicList(req, res); // 请求json
    } else if (method === 'GET' && pathname === '/add') {
        handler.showAdd(req, res); // 添加 Get
    } else if (method === 'POST' && pathname === '/add') {
        handler.doAdd(req, res); // 添加 Post
    } else if (method === 'GET' && regex_remove.test(pathname)) {
        // 统一规定：后面从url路径中，取正则匹配的参数
        // req.params.mid
        req.params = {};
        req.params.mid = pathname.match(regex_remove)[1];
        handler.doRemove(req, res);
    } else if (method === 'GET' && regex_edit.test(pathname)) {
        req.params = {};
        req.params.mid = pathname.match(regex_edit)[1];
        handler.showEdit(req, res);
    } else if (method === 'POST' && regex_edit.test(pathname)) {
        req.params = {};
        req.params.mid = pathname.match(regex_edit)[1];
        handler.doEdit(req, res);
    } else if (pathname === '/favicon.ico'){
        handler.favicon(req, res);
    } else {
        handler.error(req,res);
    } 
};