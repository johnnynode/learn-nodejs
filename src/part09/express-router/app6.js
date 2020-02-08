const express = require('express');
const app = express();

// app.use(express.static('public')); // 默认寻找index.html
// app.use(express.static('static')); // public找不到，去找static中的资源
// app.use(express.static('public', {index: 'main.html'})); // 可以配置指定的首页, 使用/main 是访问不到的，必须使用/main.html
// app.use(express.static('public'), {index:'index.html', dotfiles: 'allow'} ); // 允许访问点开头的文件
// app.use(express.static('public'), {index: ['index.html', 'main.html']}); // 第一个不匹配，就去匹配第二个
// app.use(express.static('public'), {index:'index.html', extensions: ['htm', 'html']} ); // 匹配多种格式的问题，htm不匹配，去匹配html

app.listen(3000);