### 获取url的数据

```js
const express = require('express');
const app = express();
const r1 = express.Router();

r1.get('/test/:x/:y', (req, res) => {
    res.send(
        `
        <ul>
            <li>req.method = ${req.method}</li>
            <li>req.hostname = ${req.method}</li>
            <li>req.originalUrl = ${req.method}</li> <!-- 这里原始路径是url上的路径 -->
            <li>req.protocol = ${req.method}</li>
            <li>req.path = ${req.path}</li>  <!-- 这里的路径是路由路径 -->
            <li>req.query = ${JSON.stringify(req.query)}</li>
            <li>req.params = ${JSON.stringify(req.params)}</li>
        </ul>
        `
    )
})

app.use('/a', r1); // 测试访问：/a/test/x1/y1?name=Joh&age=100

// 自定义中间件测试完毕
app.listen(3000, function() {
    console.log('server running on port 3000');
});

```

### 获取头信息数据

1 ) **关于etag的使用**

```js
const express = require('express');
const app = express();
let eTagVersion = 100;

// 测试服务器版本是否变动过, 用于减轻服务器的请求
function freshHandle(req, res, next) {
    res.set('etag', eTagVersion);
    console.log('req.fresh: ', req.fresh);
    // console.log('req.stale: ', req.stale);
    if(req.fresh) {
        res.send(); // 如果是新鲜的，此时就会是304, send中写什么都不会改变响应客户端的内容，但必须要res.send一次
    } else {
        next();
    }
}

app.get('/test', freshHandle, (req, res) => {
    res.send('version: ' + eTagVersion);
});

app.get('/update', (req, res) => {
    ++eTagVersion;
    res.send('update');
})

// 自定义中间件测试完毕
app.listen(3000, function() {
    console.log('server running on port 3000');
});
```

可以测试先/test，再/update，再/test的控制台输出

2 ） **ajax访问测试**

客户端：public目录下index.html文件

```html
<script>
     var xhr = new XMLHttpRequest();
     xhr.open('get', '/testajax', true);
     xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
     xhr.send();
</script>
```

服务器端：

```js
const express = require('express');
const app = express();
const serveStatic = require('serve-static');

app.use(serveStatic('public'));

// 如果是ajax请求，必须在客户端请求头上添加X-Requested-With字段
app.get('/testajax', (req, res) => {
    if(req.xhr) {
        res.send('is xhr: ' + req.xhr); // 此处会在控制台输出而不是，返回的是一小段信息
    } else {
        // res.render(); // 这里处理渲染页面
    }
});

// 自定义中间件测试完毕
app.listen(3000, function() {
    console.log('server running on port 3000');
});
```

### 解析实体主体信息

客户端 public2 index.html

```html
不写

<form action="/submit" method="post">
    <input type="text" name="name">
    <input type="password" name="password">
    <input type="submit">
</form>

<hr />

application/x-www-form-urlencoded

<form action="/submit" method="post" enctype="application/x-www-form-urlencoded">
    <input type="text" name="name">
    <input type="password" name="password">
    <input type="submit">
</form>

<hr />

application/json 这样不支持，会自动转化成application/x-www-form-urlencoded

<form action="/submit" method="post" enctype="application/json">
    <input type="text" name="name">
    <input type="password" name="password">
    <input type="submit">
</form>

<hr />

text/plain

<form action="/submit" method="post" enctype="text/plain">
    <input type="text" name="name">
    <input type="password" name="password">
    <input type="submit">
</form>


<button id="btn">bodyParser.json BTN</button>

<hr />

<button id="btn2">bodyParser.raw BTN</button>

<script>
    document.querySelector('#btn').onclick = function() {
        var xhr = new XMLHttpRequest();
        xhr.open('post', '/submit', false);
        xhr.setRequestHeader('Content-Type', 'application/');
        xhr.send(JSON.stringify({name:'Joh'}));
    }

    document.querySelector('#btn2').onclick = function() {
        var xhr = new XMLHttpRequest();
        xhr.open('post', '/submit', false);
        xhr.setRequestHeader('Content-Type', 'application/octet-stream');
        xhr.send(JSON.stringify({name:'Joh'}));
    }
</script>
```

服务端：

```js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static('public2'));
// 通过这个中间件的方法可以解析表单的信息
app.use(bodyParser.urlencoded()); // 只能解析表单enctype的"application/x-www-form-urlencoded"的信息 返回的是json
app.use(bodyParser.json()); // 解析的是json类型的文本，ajax的类型数据, 不能使用上面的urlencoded来解析json类型的ajax数据
app.use(bodyParser.text()); // 解析的是文本类型的数据如：，返回的是text 很不常用
app.use(bodyParser.raw()); // 解析的是二进制提交的数据 很不常用

app.post('/submit', (req, res) => {
    res.send(req.body); // 这里如果是json类型的ajax数据会以小段信息的方式返回到浏览器控制台，而非渲染页面
    // res.send(JSON.parse(req.body.toString())); 这里解析 bodyParser.raw() 提交的数据，是一小段信息，而非渲染页面
});

// 自定义中间件测试完毕
app.listen(3000, function() {
    console.log('server running on port 3000');
});
```

### 文件上传

1 ) **文件上传的多种方式**

客户端/public3/index.html

```html
<form action="/upload" method="post" enctype="multipart/form-data">
    <input type="text" name="name">
    <input type="file" name="file">
    <input type="submit">
</form>

<hr />

<form action="/upload2" method="post" enctype="multipart/form-data">
    <input type="text" name="name">
    <input type="file" name="file2">
    <input type="file" name="file2">
    <input type="submit">
</form>

<hr />

<form action="/upload2" method="post" enctype="multipart/form-data">
    <input type="text" name="name">
    <input type="file" name="file3">
    <input type="file" name="file4">
    <input type="submit">
</form>
```

服务端

```js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

app.use(express.static('public'));
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
```

2 ） **文件存储**

客户端：

```html
<form action="/upload" method="post" enctype="multipart/form-data">
    <input type="text" name="name">
    <input type="file" name="file1">
    <input type="file" name="file2">
    <input type="submit">
</form>
```

服务端：方式1, 存储到硬盘上

```js
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
```

服务端：方式2, 文件存储在内存并过滤，用于后续自行读取操作

```js
const express = require('express');
const app = express();
const multer = require('multer');

// 上传到内存
var storage = multer.memoryStorage();
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
```

程序进一步优化和错误处理

```js
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
```

### 响应

1 ） **基本响应方式**

```js
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
```

2 ） **动态渲染**

