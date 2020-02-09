const express = require('express');
const app = express();
const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'tmp') // 这个路径需要先创建好
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop())
    }
});
var upload = multer({ storage: storage })
app.use(express.static('public4'));
app.use(upload.fields([{name:'file1', maxCount:3},{name:'file2', maxCount:3}])); // 参数3 表示支持上传3个名称同为file2的对象，可以接收自定义数量的不同名文件

app.post('/upload', (req, res) => {
    console.log(req.body); // 这里解析非file类型的数据
    // console.log(req.file); // undefined
    console.log(req.files); // 这里是数组的形式
    res.redirect('/');
});

// 自定义中间件测试完毕
app.listen(3000, function() {
    console.log('server running on port 3000');
});
