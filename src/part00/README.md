### Node.js的诞生

- 2008年
- Ryan Dahl的目标：创建一个易扩展、适用于现代Web应用通信的服务器平台

### 国内外的应用情况

- LinkedIn移动版From RoR to Node.js, base on Joyent
- Paypal From Java to Node.js
- Twitter的队列：收集需要保存的Tweets，传给负责写入的进程
- 知乎的推送
- 网易
- 阿里
- 各种创业团队

### 主要应用领域

- RESTFul API
- 实时通信：如消息推送等
- 高并发
- I/O阻塞

### 社区

- 生于社区
- 社区推进
- Github
- 国内

### 生态圈

- 以NPM为中心
- 基础服务提供商的支持
- 周边服务提供商的支持

### 认识Node.js — 知名度较高的Node.js开源项目

- express
- pm2
- jade
- coffescript
- atom
- socket.io
- mongoose
- mocha

### IO.js

- Joyent的目标：兼容性、性能
- 社区：New features
- IO.js：A friendly fork of Node.js with an open governance model
- 现状：IO.js的发展速度，成为了有史以来成长最快的开源项目
- 关系：全面兼容，二者依然有可能合并

### Node.js与JavaScript的关系

1 ) JavaScript的诞生

- 1995年
- JavaScript诞生：Branden Eich，10天时间
- JavaScript的目标：业余人士，浏览器上的脚本语言

2 ) ECMAScript与DOM/BOM

- 1996-08，包含JScript的IE3.0发布
- 1996-11，Netscape将JavaScript提交给ECMA
- 1997-06，ECMA-262发布
- JavaScript = ECMAScript + DOM + BOM

3 ) Gmail与Google V8

- 2004-04-01，Gmail发布
- 2005-02-08，Google Maps发布，后又推出街景服务
- 2008-09-02，Google Chrome发布，一同面世的还有V8

4 ) 新浪潮中的前端框架

- DOM操作：jQuery / ExtJS / YUI
- 结构化前端框架：AngularJS / Backbone.js / Ember.js

5 ）相关语言
Rhino引擎
javax.script API

5 ) 其他
原生支持异步
历史包袱
开发门槛
fib:js
全栈语言：angular.js 、backbone.js、node、fib:js、React Native、PhoneGap ...

### nodejs 特点

1 ） 部署简单方便

- 环境配置简单，只需要安装Node.js即可
- 注重约定
- 项目所需要扩展、插件、资源相对独立，不易冲突

2 ）事件驱动

- 主要观点：根据当前出现的事件，调动资源进行相关的处理。

3 ） 异步编程

- 异步的实现方式
  * 回调函数
  * 事件监听
  * 订阅/发布

- 高效与性能
    * 单个操作的性能并不优于其它解决方案
    * 通过优化资源调配和I/O操作来实现高效

- 其它语言对IO的处理：
    * PHP：原地等待，开多进程
    * C/C++：利用线程，程序要自己维护线程和资源的状态

- Google V8是单线程的，所以Node.js与同样是单进程的。为了更好的利用CPU资源，可以利用子进程和多进程：
    * 子进程：Node.js的child_process模块
    * 多进程：PM2等第三方工具

3 ) Node.js的缺点

- 大量采用匿名函数，使得抛出的异常不易阅读
- try/catch限于同步代码，使得异常捕获较为复杂
- 单线程：可靠性
- 不适合CPU密集型的场景
- 回调的代码习惯影响阅读