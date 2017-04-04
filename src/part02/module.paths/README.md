### 关于module.path

#### 在windows系统上输出内容为：
```log
true
[ 'D:\\Projects\\myGitHub\\learn-nodejs\\src\\part02\\node_modules',
  'D:\\Projects\\myGitHub\\learn-nodejs\\src\\node_modules',
  'D:\\Projects\\myGitHub\\learn-nodejs\\node_modules',
  'D:\\Projects\\myGitHub\\node_modules',
  'D:\\Projects\\node_modules',
  'D:\\node_modules' ]
```

#### 自定义模块的查找机制
很显然它是一个数组,它表示了nodejs查找自定义模块的查找机制, 这种自定义模块我们称之为包
> Node.js中，有一种默认的路径加载规则，那么这个规则就是module.paths中的目录规则
> Node.js根据module.paths中的第一个：
> D:\\Projects\\myGitHub\\learn-nodejs\\src\\part02\\node_modules
> 在该目录下找一个叫做package.json的文件
> 如果找到：通过JSON.parse的方式拿到该对象，
> 获取main属性，如果main属性中的值可以拼接为一个完整的路径并且是正确的
> 直接加载该模块，拿到module.exports
> 如果找不到package.json文件或者找到了但是里面没有main属性或者main属性的值是错误的,它会直接查找：
> index.js
> index.node
> index.json
> 如果在当前目录下的node_modules目录下找不到该模块
> 按照module.paths中的路径规则，逐级查找，重复上面的步骤
> 如果最后找到了最后一个路径还是找不到，报错