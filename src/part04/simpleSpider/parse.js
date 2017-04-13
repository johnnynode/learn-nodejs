"use strict";

const request = require("request");
const cheerio = require("cheerio");

// 封装一个获取页面的方法
function parse(url, callback) {
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
        $('header ul li').each((index, item) => {
            bodyContainer.headerArr.push({
                text: $(item).text().trim()
            });
        });

        // 解析中间部分
        $('section > div > button').each((index, item) => {
            bodyContainer.middleArr.push({
                text: $(item).text().trim()
            });
        });

        // 尾部
        bodyContainer.footer = $('footer').text().trim();

        // 用回调将数据带出
        callback(null, bodyContainer);
    })
}

module.exports = parse; // 输入封装的方法
