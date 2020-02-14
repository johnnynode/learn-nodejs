const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

app.use(express.static('public3'));
app.use(upload.single('file')); // 在客户端上传文件的时候不可以上传两个同name的文件, 做下限制 ，只能接收1个name的文件
app.use(upload.array('file2'), 3); // 参数3 表示支持上传3个名称同为file2的对象，只能接收1个name的文件
app.use(upload.fields([{name:'file3', maxCount:3},{name:'file4', maxCount:3}])); // 参数3 表示支持上传3个名称同为file2的对象，可以接收自定义数量的不同名文件

app.post('/upload', (req, res) => {
    console.log(req.body); // 这里解析非file类型的数据
    console.log(req.file); // 这里是file数据的文件描述信息
    res.redirect('/');
});

app.post('/upload2', (req, res) => {
    console.log(req.body); // 这里解析非file类型的数据
    // console.log(req.file); // undefined
    console.log(req.files); // 这里是数组的形式
    res.redirect('/');
});

app.post('/upload3', (req, res) => {
    console.log(req.body); // 这里解析非file类型的数据
    // console.log(req.file); // undefined
    console.log(req.files); // 这里是数组的形式
    res.redirect('/');
});

// 自定义中间件测试完毕
app.listen(3000, function() {
    console.log('server running on port 3000');
});
