const express = require('express');
const app = express();

// 下载
app.get('/download', (req, res) => {
    res.download('download.txt');
});

// 文本串
app.get('/text', (req, res) => {
    res.text('Hello text!');
});

// json
app.get('/json', (req, res) => {
    res.json({name:'123'});
});

// redirect 重定向
app.get('/redirect', (req, res) => {
    res.redirect('http://taobao.com'); 
    // res.redirect('/json');
});

// send 二进制/json/html
app.get('/send1', (req, res) => {
    res.send({name:'Joh'});
});

app.get('/send2', (req, res) => {
    res.send(new Buffer('xy')); // 二进制数据
});

app.get('/send3', (req, res) => {
    res.send("<p>测试</p>"); // 二进制数据
});

// 相当于静态资源访问了 /file/xy.txt
app.get('/file/:name', function (req, res, next) {
    var options = {
      root: __dirname + '/public5/',
      dotfiles: 'deny',
      headers: {
          'x-timestamp': Date.now(),
          'x-sent': true
      }
    };
  
    var fileName = req.params.name;
    res.sendFile(fileName, options, function (err) {
      if (err) {
        next(err);
      } else {
        console.log('Sent:', fileName);
      }
    });
  
  });
  

// 自定义中间件测试完毕
app.listen(3000, function() {
    console.log('server running on port 3000');
});
