### 关于小爬虫

> 所有命令都在simpleSpider目录下执行

- 首先关于simple页面的http访问:开启一终端或bash或cmd
  $`hs -o -p 3000`

- 在simpleSpider目录下
  $ `node index` 就可以爬网页的功能

### 关于这个小案例模块结构
- index模块是程序主入口
- parse模块封装的函数用于解析网页代码结构
- rander模块用于使用爬到的数据渲染存储模块
- 关于 cheerio 更多api : [这里](https://www.npmjs.com/package/cheerio)
