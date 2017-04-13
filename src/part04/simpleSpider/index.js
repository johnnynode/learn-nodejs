"use strict";

const fs = require("fs");
const path = require("path");
const request = require("request");
const cheerio = request("cheerio");

// 封装一个获取页面的方法
function parsePage(url, callback) {
    // request 请求解析页面
    request(url, (err, res, body) => {
        if (err) return callback(err, null);
        let $ = cheerio.load(body); // 解析html成类似于jQuery的对象

        // 内容容器
        let bodyContainer = {};
        bodyContainer.headerArr = [];
        bodyContainer.middleArr = [];
        bodyContainer.footer = '';

        // 解析头部
        $('header ul').each((index, item) => {
            bodyContainer.headerArr.push({
                text: $(item).text()
            });
        });

        // 解析中间部分
        $('section > div').each((index, item) => {
            bodyContainer.middleArr.push({
                text: $(item).text()
            });
        });

        // 尾部
        bodyContainer.footer = $('footer').text();
    })
}