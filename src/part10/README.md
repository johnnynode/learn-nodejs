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
