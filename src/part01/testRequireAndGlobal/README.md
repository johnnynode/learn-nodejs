### 简单小案例说明

- index.js 是入口 , 通过require的方式引入 foo.js , bar.js
- 每个文件即是一个模块
- bar.js 中输出一句话和挂载变量到Global对象上
- foo.js 中通过module.exports暴露一个方法用于输出name, 
- 最终 $ node index 输出结果如下：
  ```javascript
    I am bar
    fooName jack
    global.barVarible barVarible
  ```