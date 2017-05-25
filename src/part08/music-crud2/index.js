"use strict";

const http = require('http');
const url = require('url');
const router = require('./services/router');

const render = require('./services/render');
const staticServe = require('./services/static-serve');
const bodyParser = require('./services/body-parser');


const server = http.createServer((req, res) => {
    let urlObj = url.parse(req.url);
    let pathname = urlObj.pathname;
    let method = req.method;

    if (pathname === '/') {
        fs.readFile(path.join(__dirname, 'index.html'), 'utf8', function (err, data) {
            if (err) {
                return res.end(err.message);
            }
            let compiled = _.template(data);
            let htmlStr = compiled({
                musicList
            });
            // 将完整的html字符串响应给客户端
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.end(htmlStr);
        });
    } else if (method === 'GET' && pathname === '/add') {
        fs.readFile(path.join(__dirname, 'add.html'), 'utf8', function (err, data) {
            if (err) {
                return res.end(err.message);
            }
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.end(data);
        });
    } else if (method === 'POST' && pathname === '/add') {
        recivePostData(req, function (requestBody) {
            let id = requestBody.id;
            let name = requestBody.name;
            let singer = requestBody.singer;
            let isHightRate = requestBody.isHightRate;
            let musicInfo = musicList.find(m => m.id === id);
            if (musicInfo) {
                return res.end('music is already exists');
            }
            isHightRate = isHightRate === '1';
            musicList.push({
                id,
                name,
                singer,
                isHightRate
            });
            res.writeHead(301, {
                'Location': '/'
            });
            res.end();
            // 暂时无法支持 end() 之后再重定向，让客户端做。
        });
    } else if (method === 'GET' && regex_remove.test(pathname)) {
        let m_id = pathname.match(regex_remove)[1];
        let index = musicList.findIndex(m => m.id === m_id);
        // console.log(index);
        musicList.splice(index, 1);
        // 删除完成, 回到首页
        res.writeHead(301, {
            'Location': '/'
        });
        res.end();
    } else if (method === 'GET' && regex_edit.test(pathname)){
        let m_id = pathname.match(regex_edit)[1];
        // 根据音乐信息id找到该项
        let musicInfo = musicList.find(m => m.id === m_id);
        // 如果不存在，返回该项不存在。
        if (!musicInfo) {
            return res.end('music is not exists');
        }
        // 读取文件
        fs.readFile(path.join(__dirname, 'edit.html'), 'utf8', function (err, data) {
            if (err) {
                return res.end(err.message);
            }
            // 拿到数据之后，模板编译
            let compiled = _.template(data);
            let htmlStr = compiled({
                musicInfo
            });
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            });
            res.end(htmlStr);
        });
    } else if(method === 'POST' && regex_edit.test(pathname)){
        // 处理post提交的数据
        recivePostData(req, function (requestBody) {
            let m_id = pathname.match(regex_edit)[1];
            let name = requestBody.name;
            let singer = requestBody.singer;
            let isHightRate = requestBody.isHightRate;
            // 你要编辑谁？
            // 根据id查找数组中的索引
            let index = musicList.findIndex(m => m.id === m_id);
            musicList[index].name = name;
            musicList[index].singer = singer;
            musicList[index].isHightRate = isHightRate === '1';
            res.writeHead(301, {
                'Location': '/'
            });
            res.end();
        });
    } else if (pathname === '/error') {
        fs.readFile( path.join(__dirname, '404.html'), 'utf8', (err, data) => {
            if (err) {
                return res.end(err.message);
            }
            let compiled = _.template(data);
            let htmlStr = compiled({
                musicList
            });
            // 将完整的html字符串响应给客户端
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            });
            res.end(htmlStr);
        });
    } else {
        // 处理404
        res.writeHead(301, {
            'Location': '/error'
        });
        res.end();
    }
});

server.listen(3000, '127.0.0.1', () => {
    console.log('server is listening at port 3000');
});

/* 处理post的数据 */
function recivePostData(request, callback) {
    let data = '';
    request.on('data', function (chunk) {
        data += chunk;
    });
    request.on('end', function () {
        callback(qstring.parse(data));
    });
}