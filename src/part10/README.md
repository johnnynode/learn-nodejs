### 结构型数据库

1 ) **特点**
- 数据库有行、列的概念，数据有关系，数据不是散的
- MySQL、SQL Server、Oracle、Access, 因为每个表中，都有明确的字段，每行记录，都有这些字段。不能有的行有，有的行没有.
- 数据库能够提供非常方便的接口，让增删改查操作变得简单
- 数据库不能自己玩儿，要给向PHP、.net、jsp等语言提供接口。
- 那么SQL型数据库，非常擅长条件查询，也就是筛选！

2 ）**存在的问题**
- 数据量大的情况, 要动字段，时间太长
- 字段这个东西，太不灵活，，需要是同样类型的数据。不能一行记录是文本，一行记录是数字

### NoSQL

1 ) **特点**
- 非结构型数据库。没有行、列的概念。用JSON来存储数据。
- 集合就相当于“表”，文档就相当于“行”。文档就是JSON，上下文语境中，也是JavaScript

2 ） **适用于**
- 数据模型比较简单；
- 需要灵活性更强的IT系统；
- 对数据库性能要求较高；
- 不需要高度的数据一致性；
- 对于给定key，比较容易映射复杂值的环境。

### MongoDB安装

- 官网：https://www.mongodb.com/
- 手册：https://docs.mongodb.org/manual/

### MongoDB相关命令

- `mongo`  使用数据库
- `mongod` 开机
    * `mongod --dbpath c:\mongo`
    * `-dbpath` 选择数据库文档所在文件夹
    * mongoDB中，真的有物理文件，对应一个个数据库。U盘可以拷走
    * 开机后一定要保持，开机这个CMD不能动了，不能关，不能ctrl+c。 一旦这个cmd有问题了，数据库就自动关闭了
- `mongoimport` 导入数据
- 可以再开一个cmd，输入命令 `mongo` 
- `show dbs` 列出所有数据库
- `use 数据库名字` 新建数据库，也是use, use一个不存在的即可
- `db` 查看当前所在数据库
- 插入数据：`db.stu.insert({"name":"wang"})`
    * stu 就是集合(sql中的表)
    * 插入的json就是文档(sql中的一条记录)
    * 只能在集合中插入文档(json)，而不能在数据库中
- 删除数据库：`db.dropDatabase()`
- 我们不可能一条一条的insert。所以，我们希望用sublime在外部写好数据库的形式，然后导入数据库
    * `mongoimport --db db1 --collection stu --drop --file primer-dataset.json`
    * `-db db1` 往db1数据库里面导入
    * `--collection stu` 想往stu集合中导入
    * `--drop` 把集合清空
    * `--file primer-dataset.json` 哪个文件

### MongoDB查找数据

- 用find, find中没有参数, 那么将列出这个集合的所有文档, `db.stu.find()`
- 精确匹配 `db.stu.find({"score.shuxue":70})`
- 多个条件 `db.stu.find({"score.shuxue":70 , "age":12})`
- 大于条件 `db.stu.find({"score.yuwen":{$gt:50}});`
- 或者：`db.stu.find({$or:[{"age":9},{"age":11}]});`
- 查找完毕之后，打点调用sort，表示升降排序。`db.stu.find().sort({ "borough": 1, "address.zipcode": 1})`

### MongoDB修改数据

- 修改里面还有查询条件。你要该谁，要告诉mongo
- 查找名字叫做小明的，把年龄更改为16岁：`db.stu.update({"name":"小明"},{$set:{"age":16}});`
- 查找数学成绩是70，把年龄更改为33岁：`db.stu.update({"score.shuxue":70},{$set:{"age":33}});`
- 更改所有匹配项目: 默认只修改一条, 加上 multi 选项表示全部匹配：`db.stu.update({"sex":"男"},{$set:{"age":33}},{multi: true});`
- 完整替换，不出现$set关键字了: `db.stu.update({"name":"小明"},{"name":"大明","age":16});`

### MongoDB删除数据

- 默认删除全部匹配的条件, justOne参数来限制只删除一条
- `db.restaurants.remove({"borough": "Manhattan"})` 删除全部
- `db.restaurants.remove({"borough": "Manhattan"}, {justOne: true})`

### MongoDB数据分页

- mongodb提供了傻傻的两个函数：`limit()`，`skip()`
- 第一页是`page=0`。每页10条，所以当前页的查询语句: `db.stu.find({}).limit(10).skip(page*10)`
- 数据总数怎么得到：`db.stu.stats().count;`

### MongoDB其他说明

- 把常用的增删改查, 都封装成为module
- 开发DAO：J2EE开发人员使用数据访问对象（DAO）设计模式把底层的数据访问逻辑和高层的商务逻辑分开.实现DAO模式能够更加专注于编写数据访问代码
- 使用我们自己的DAO模块，来实现数据库插入, 代码变得简单

### Cookie

- HTTP是无状态协议。简单地说，当你浏览了一个页面，然后转到同一个网站的另一个页面，服务器无法认识到，这是同一个浏览器在访问同一个网站。每一次的访问，都是没有任何关系的。
那么世界就乱套了，比如我上一次访问，登陆了，下一次访问，又让我登陆，不存在登陆这事儿了。
- Cookie是一个简单到爆的想法：当访问一个页面的时候，服务器在下行HTTP报文中，命令浏览器存储一个字符串；浏览器再访问同一个域的时候，将把这个字符串携带到上行HTTP请求中。
- 第一次访问一个服务器，不可能携带cookie。 必须是服务器得到这次请求，在下行响应报头中，携带cookie信息，此后每一次浏览器往这个服务器发出的请求，都会携带这个cookie。

**特点**
- cookie是不加密的，用户可以自由看到；
- 用户可以删除cookie，或者禁用它
- cookie可以被篡改
- cookie可以用于攻击
- cookie存储量很小。未来实际上要被localStorage替代，但是后者IE9兼容。
- express中的cookie：res负责设置cookie，req负责识别cookie

### Session
- 会话Session不是一个天生就有的技术，而是依赖cookie
- 当一个浏览器禁用cookie的时候，登陆效果消失； 或者用户清除了cookie，登陆也消失。
- session比cookie不一样在哪里呢？ 
    * session下发的是乱码，并且服务器自己缓存一些东西，下次浏览器的请求带着乱码上来，此时与缓存进行比较，看看是谁。
    * 一个乱码，可以对应无限大的数据。
- 任何语言中，session的使用，是“机理透明”的。它是帮你设置cookie的，但是足够方便，让你感觉不到这事儿和cookie有关。

示例：

```js
var session = require("express-session");
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))
	
app.get("/",function(req,res){
    if(req.session.login == "1"){
        res.send("欢迎" + req.session.username);
    }else{
        res.send("没有成功登陆");
    }
});

app.get("/login",function(req,res){
    req.session.login = "1";	//设置这个session
    req.session.username = "哈哈";
    res.send("你已经成功登陆");
});

```

- 不管你加密多大的东西，哪怕10M文字，都会加密为32位的字符串，就是密码。
- 并且神奇的，数学上能够保证, 哪怕你更改1个文字，都能大变。所以MD5也能用于比对版本。
- MD5是数学上,不能破解的, 不能反向破解。
- 也就是说，C4CA4238A0B923820DCC509A6F75849B 没有一个函数，能够翻译成为1的。
- 有的人做数据库，就是把1~999999所有数字都用MD5加密了，然后进行了列表，所以有破解的可能。

### 关于数据加密

- MD5加密是函数型加密。就是每次加密的结果一定相同，没有随机位。
- 特点：
    * 不管加密的文字，多长多短，永远都是32位英语字母、数字混合。
    * 哪怕只改一个字，密文都会大变。
    * MD5没有反函数破解的可能，网上的破解工具，都是通过字典的模式，通过大量列出明-密对应的字典，找到明码。
    * 两次加密网上也有对应的字典。所以我们不要直接用一层md5，这样对黑客来说和明码是一样。
- MD5常用于作为版本校验。可以比对两个软件、文件是否完全一致。
- node中自带了一个模块，叫做crypto模块，负责加密。
- 首先创建hash，然后update和digest：
    ```js
    var md5 = crypto.createHash('md5');
    var password = md5.update(fields.password).digest('base64');
    ```

### 图片处理

- 瑞士军刀：GraphicsMagick is the swiss army knife of image processing. 
- http://www.graphicsmagick.org/
- https://github.com/aheckmann/gm
- 只要服务器需要处理图片，那么这个服务器就要安装graphicsmagick软件，免费开源
- 装完之后，可视化工具一点用都没有，从桌面上删除。我们要把安装目录设置为环境变量
- windows如果是setup安装完毕要重启电脑，mac端需要进行安装其他软件
    * `brew install imagemagick --with-webp`
    * `brew install graphicsmagick`

**控制台CMD命令**

- 格式转换：`gm convert a.bmp a.jpg`
- 更改当前目录下*.jpg的尺寸大小，并保存于目录.thumb里面
    * `gm mogrify -resize 320x200 danny.jpg`
- nodejs要使用graphicsmagick，需要npm装一个gm的包
- node.js缩略图的制作
    ```js
    var gm = require('gm');
    gm('./xy.jpg')
        .resize(50, 50,"!")
        .write('./zz.jpg', function (err) {
            if (err) {
                console.log(err);
            }
        });
    ```
- node.js头像裁切
    ```js
        var gm = require('gm');
    // 141  96 是宽高 152  181是坐标
    gm("./xy.jpg")
        .crop(141,96,152,181)
        .write("./zz.jpg",function(err){
            if (err) {
                console.log(err);
            }
        });
    ```

#### jcrop

- jQuery截图插件jcrop在项目目录下