### express的安装

1. 手工安装和使用 express
2. 通过生成器生成 express 项目
    * `npm i -s express-generator` 这是express的生成器
    * express此时是命令了 `express -h`、`express`
    * 项目中使用 `../../../node_modules/.bin/express` 来执行express命令
    * `../../../node_modules/.bin/express -e demo`
    * `../../../node_modules/.bin/express -e .`
    * 在`express-gen`目录下执行`npm i && cd bin && node www`
    * 访问: `localhost:3000` 即可见

### 浏览器对http的方法的支持

1. get
2. post
3. 如何支持更多的方法？delete、update、search等如何加入

试验：

```html
<form action="/xy" method='update'>
    <input type="submit" value="提交">
</form>
```

无法支持其他method的提交，会自动转换为get或post

如何解决，需要靠服务器来重写请求

### method override

- 重写req.method属性
- 浏览器通过GET/POST方法发送请求，请求信息里包括[伪方法]信息
- method-override是express的一个插件，用于重写req.method属性，并把原始req.method保存在req.originalMethod里
- [method-override github](https://github.com/expressjs/method-override)

1 ） **自己写一个中间件测试修改method方法**
表单：
```html
<!-- 注：这里method用原本就支持的get方法 -->
<form action="/" method='get'>
    <input type="hidden" name="_method" value="search" />
    <input type="submit" value="提交">
</form>
```

服务器中间件处理：改变req.method方法
```js
app.use(function(req, res, next) {
  req.oldMethod = req.method;
  req.method = req.query._method;
  next();
});

// express官网上支持的method都可以这样处理
app.search('/', function(req, res) {
    res.send("I'm search method");
});
```

2 ） **使用method-override插件进行处理**

**方式一：**

客户端
```html
<button id='test'>test</button>
<script>
    var test = document.querySelector('#test');
    test.onclick = function() {
        var xhr = new XMLHttpRequest();
        xhr.open('post', '/', true);
        xhr.setRequestHeader('X-HTTP-Method-Override', 'search');
        xhr.send();
        xhr.onload = function(res) {
            console.log(this.responseText);
        }
    }
</script>
```

服务端：

```js
var methodOverride = require('method-override'); // 先安装
app.use(methodOverride()); // 配置中间件

app.search('/', function(req, res) {
  res.send('my name is search method.');
});
```

**方式2**

客户端

```html
<form method="post" action="/?__method=search">
    <input type="submit">
</form>
```

服务端

```js
var methodOverride = require('method-override'); // 先安装
app.use(methodOverride('__method')); // 配置中间件 模式是post的请求方式

app.search('/', function(req, res) {
  res.send('my name is search method.');
});
```

**方式3**

客户端

```html
<form method="get" action="/">
    <input type="hidden" name="__method" value="search">
    <input type="submit">
</form>
```

服务端

```js
var methodOverride = require('method-override'); // 先安装
app.use(methodOverride('__method', {methods:['POST', 'GET']})); // 配置中间件
// app.use(methodOverride('__method', {methods: null})); // 配置中间件 这种方式也可

app.search('/', function(req, res) {
  res.send('my name is search method.');
});
```

**方式4**

客户端

```html
<form method="get" action="/">
    <input type="hidden" name="__method" value="search">
    <input type="submit">
</form>
```

服务端

```js
var methodOverride = require('method-override'); // 先安装

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// 这里一定要在这个位置，不能在下面，因为是post请求需要处理json
app.use(methodOverride(function(req, res) {
  return req.body.__method;
})); // 配置中间件

app.search('/', function(req, res) {
  res.send('my name is search method.');
});
```

其他method方式可以类似支持

### 路由的其他相关应用

接收参数

```js
app.get('/user/:name/:group', function(req, res, next) {
  let name = req.params.name;
  let group = req.params.group;

  console.log(name, group);
  // next();
});
```

创建路由对象

```js
var router = express.Router({
    mergeParams: true, // 配置父级路由信息是否共享, 默认false
    caseSensitive: true, // 配置路由的路径大小写是否区分, 默认false
    strict: true // 配置是否区分严格模式 /test 和 /test/是完全不一样的
});

// 也可以使用下面app.set的方式来配置
// app.set('strict routing', true);
// app.set('case sensitive routing', true);

app.get('/user/:name/:group', function(req, res, next) {
  let name = req.params.name;
  let group = req.params.group;

  console.log(name, group);
  next();
});

app.use('/user/:name/:group', router);

router.get('/', function(req, res) {
    res.send('router info: ' + req.params.name + ' ' + req.params.group); // 上面配置过即可获取信息
});

router.get('/test', function(req, res) {
    res.send('router test info: ' + req.params.name + ' ' + req.params.group); // 上面配置过即可获取信息
});

router.get('/TEst', function(req, res) {
    res.send('router TEst info: ' + req.params.name + ' ' + req.params.group); // 上面配置过即可获取信息
});

router.get('/test/', function(req, res) {
    res.send('router test/ info: ' + req.params.name + ' ' + req.params.group); // 上面配置过即可获取信息
});

```

### 路由适配器的快捷写法

客户端

```html
<form action="/test" method="post">
    <input type="submit" value="test post method">
</form>

<br />
<br />
<br />

<form action="/test">
    <input type="submit" value="test get method">
</form>
```

服务器

```js
var router = express.Router();

router.route('/test')
  .get(function(req, res, next) {
    console.log('get one');
    next();
  })
  .get(function(req, res, next) {
    console.log('get two');
    res.send('test get');
  })
  .post(function(req, res, next) {
    console.log('post one');
    next();
  })
  .post(function(req, res, next) {
    console.log('post two');
    res.send('test post');
  });

app.use('/', router);

```

### 路由请求参数处理器

1 ） **处理单个参数**

```js
const express = require('express');
const app = express();

app.param('id', (req, res, next, id) => {
    if(id !== '001') {
        res.send(404);
    } else {
        next();
    }
});

app.get('/user/:id', (req, res)=>{
    res.send('helloworld user id is: ' + req.params.id);
});

app.listen(3000);
```

或 简化之 关键代码：

```js
app.get('/user/:id', (req, res) => {
    res.send('helloworld user id is: ' + req.params.id);
})
.param('id', (req, res, next, id) => {
    if(id !== '001') {
        res.send(404);
    } else {
        next();
    }
});
```

处理多个参数，关键代码：

```js
app.get('/user/:id/:name', (req, res) => {
    res.send(
        `
        user's name = ${req.params.name}
        user's id = ${req.params.id}
        `
    );
})
.param(['id', 'name'], (req, res, next, value) => {
    console.log('value', value); // 这里会调用两次
    next();
});
```

因为可能会调用两次，需要对不同的参数进行特殊处理，如果觉得麻烦，可以这样

```js
app.get('/user/:id/:name', (req, res) => {
    res.send(
        `
        user's name = ${req.params.name}
        user's id = ${req.params.id}
        `
    );
})
.param('id', (req, res, next, value) => {
    console.log('id', value); // 这里会调用两次
    next();
})
.param('name', (req, res, next, value) => {
    console.log('name', value); // 这里会调用两次
    next();
});
```

**router 也有和app类似的功能**

```js
const express = require('express');
const app = express();
const router = express.Router();

app.use('/', router);

router.get('/user/:id/:name', (req, res) => {
    res.send(
        `
        user's name = ${req.params.name}
        user's id = ${req.params.id}
        `
    );
})
.param('id', (req, res, next, value) => {
    console.log('id', value); // 这里会调用两次
    next();
})
.param('name', (req, res, next, value) => {
    console.log('name', value); // 这里会调用两次
    next();
});

app.listen(3000);
```

备注：router是没有数组的相关app， 不能通过`.param(['id', 'name'], ()=>{})` 这样的方式来处理参数
一个一个的处理

router.param 还支持其他的写法：

```js
const express = require('express');
const app = express();
const router = express.Router();

app.use('/', router);

// 此处定义router的param 不能写在下面，需要独立定义
router.param((key, value) => {
    console.log('key :', key); // 这里会调用两次
    console.log('value :', value); // 这里会调用两次
    
    return (req, res, next, v)=>{
        console.log('v: ', v);
        next();
    }
});

router.get('/user/:id/:name', (req, res) => {
    res.send(
        `
        user's name = ${req.params.name}
        user's id = ${req.params.id}
        `
    );
})
.param('id', '100')
.param('name', 'Joh');

app.listen(3000);
```

### 路由处理器组链

1 ) **方式1**

```js
app.get('/', (req, res, next) => {
    console.log(1);
    next();
});
app.get('/', (req, res, next) => {
    console.log(2);
    next();
});
app.get('/', (req, res, next) => {
    console.log(2);
    res.send('Hello!')
});
```

2 ) **方式2**

```js
app.get('/',
    function(req, res, next) {
        console.log(1);
        next();
    },
    function(req, res, next) {
        console.log(2);
        next();
    },
    function(req, res) {
        console.log(3);
        res.send('Hello');
    }
);
```

3 ） **方式3**

```js
app.get('/',
    [function(req, res, next) {
        console.log(1);
        next();
    },
    function(req, res, next) {
        console.log(2);
        next();
    },
    function(req, res) {
        console.log(3);
        res.send('Hello');
    }]
);
```

4 ) **方式4**

```js
app.get('/',
    [function(req, res, next) {
        console.log(1);
        next();
    },
    function(req, res, next) {
        console.log(2);
        next();
    }],
    function(req, res) {
        console.log(3);
        res.send('Hello');
    }
);
```

### 路由和数据分离

1 ） **初始写法**

```js
let userRepo = {
    '001': {name:'user001'},
    '002': {name:'user002'}
};

app.get('/user/:id', (req, res, next) => {
    let id = req.params.id;
    let user = userRepo[id];
    if(user) {
        res.send(user);
    } else {
        res.send(404);
    }
});
```

这样写法很不好，数据与路由混在一起，需要解耦

2 ） **方式2**

db.js
```js
let userRepo = {
    '001': {name:'user001'},
    '002': {name:'user002'}
};

module.exports = {
    getUser(req, res, next) {
        let id = req.params.id;
        let user = userRepo[id];
        if(user) {
            req.user = user;
            next();
        } else {
            res.send(404);
        }
    }
}
```

app3.js

```js
app.get('/user/:id', db.getUser, (req, res) => {
    res.send(req.user);
});
```