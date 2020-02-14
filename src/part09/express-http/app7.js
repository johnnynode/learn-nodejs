const express = require('express');
const app = express();
const multer = require('multer');

// 上传到内存
var storage = multer.memoryStorage()
// 可选参数 用于过滤文件类型
function fileFilter (req, file, cb) {
    if(file.mimetype !== 'image/jpeg') {
        cb(null, false);
    } else {
        cb(null, true);
    }
  }
var upload = multer({ storage, fileFilter})

app.use(express.static('public4'));
app.use(upload.fields([{name:'file1', maxCount:3},{name:'file2', maxCount:3}])); // 参数3 表示支持上传3个名称同为file2的对象，可以接收自定义数量的不同名文件

app.post('/upload', (req, res) => {
    console.log(req.body); // 这里解析非file类型的数据
    // console.log(req.file); // undefined
    console.log(req.files); // 这里是数组的形式 单个对象中会多了一个buffer，可以自行读写
    res.redirect('/');
});

// 自定义中间件测试完毕
app.listen(3000, function() {
    console.log('server running on port 3000');
});
