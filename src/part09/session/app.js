const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

app.use(cookieParser());
app.use(session({
    store: new FileStore(), // 这个配置是基于session-file-store的, 服务器重启后 默认将文件保存到./sessions文件夹下
    secret: "Joh",
    cookie:{maxAge: 20*1000} // 20s的有效时间 过期后会开启一个新的会话
}));

// 响应数据
app.get('/', (req, res) => {
    res.send(req.cookies);
});

// 1 client -> server
// 2 S <- C (SID cookie)
// 3 C <- S (SID get session data)
app.get('/num', (req, res) => {
    if(!req.session.num) {
        req.session.num = 1;
    }
    req.session.num ++;
    res.send('req.session.num: ' + req.session.num);
});

// 自定义中间件测试完毕
app.listen(3000, function() {
    console.log('server running on port 3000');
});
