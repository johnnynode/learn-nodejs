"use strict";
const request = require("request");

request("https://www.baidu.com", (err, res, body) => {
    if (err) throw new Error(err);
    if (!err && res.statusCode == 200) console.log(body);
})