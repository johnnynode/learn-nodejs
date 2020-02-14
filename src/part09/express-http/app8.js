const express = require('express');
const app = express();
const multer = require('multer');

// 上传到内存
var storage = multer.memoryStorage()
// 可选参数 用于过滤文件类型
function fileFilter (req, file, cb) {
    if(file.mimetype !== 'image/jpeg') {
        cb(new Error(), false);
    } else {
        cb(null, true);
    }
  }
var upload = multer({ storage, fileFilter})

app.use(express.static('public4'));
// 下面这样做会拦截所有表单上传，改为中间件的形式
// app.use(upload.fields([{name:'file1', maxCount:3},{name:'file2', maxCount:3}])); // 参数3 表示支持上传3个名称同为file2的对象，可以接收自定义数量的不同名文件

var upload_mw = upload.fields([{name:'file1', maxCount:3},{name:'file2', maxCount:3}]);

// 方式1 如果发生错误会一直传递到总的错误处理中间件中去
/*
app.post('/upload', upload_mw, (req, res) => {
    console.log(req.body); // 这里解析非file类型的数据
    // console.log(req.file); // undefined
    console.log(req.files); // 这里是数组的形式 单个对象中会多了一个buffer，可以自行读写
    res.redirect('/');
});
*/

// 方式2 自行加工upload_mw中间件
app.post('/upload', (req, res) => {
    upload_mw(req, res, (err) => {
        if(err) {
            res.send(err); // 错误抛出显示
        } else {
            console.log(req.body); // 这里解析非file类型的数据
            // console.log(req.file); // undefined
            console.log(req.files); // 这里是数组的形式 单个对象中会多了一个buffer，可以自行读写
            res.redirect('/');
        }
    });
});

// 错误处理的机制
function myMiddle(req, res, next) {
    next(new Error('err'));
}

app.use('/test', (req, res) => {
    // 所有的中间件都可以这样使用，req, res, next，并且next的第一个参数用于错误处理
    myMiddle(req, res, (err) => {
        if(err) {
            res.send('wrong!');
        }
    })
})

// 总的错误处理中间件
app.use((err, req, res, next) => {
    console.log(err); // 或记入日志
});

// 自定义中间件测试完毕
app.listen(3000, function() {
    console.log('server running on port 3000');
});
