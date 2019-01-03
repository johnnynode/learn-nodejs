const http = require('http');
const fs = require('fs');
const querystring = require('querystring');
const urlLib = require('url');

let users = {}; // 用于模拟存储用户

let server = http.createServer((req, res)=>{
  let str = '';
  // 解析数据
  req.on('data', (data)=>{
    str += data;
  });
  // 读取数据
  req.on('end', (data)=>{
    let result = urlLib.parse(req.url, true);
    const url = result.pathname;
    const get_params = result.query;
    const post_params = querystring.parse(str);

    // 简单通过url中是否为user来判断是访问接口还是访问文件
    if(url === '/user') {
      switch(get_params.act) {
        case 'reg':
          // 1. 检查用户名是否已经有了
          if(users[get_params.user]) {
            console.log('1');
            res.write('{"ok": false, "msg": "用户已存在"}');
          } else {
            console.log('2');
            users[get_params.user] = get_params.pass;
            res.write('{"ok": true, "msg": "注册成功"}');
          }
          break;
        case 'login':
          // 1. 检查用户是否存在
          console.log('users');
          console.log(users);
          console.log(users[get_params.user]);
          console.log('.....');
          if(!users[get_params.user]) {
            res.write('{"ok": false, "msg": "用户不存在"}');
          } else if(users[get_params.user] !== get_params.pass) {
            res.write('{"ok": false, "msg": "用户名或密码有误"}');
          } else {
            res.write('{"ok": true, "msg": "登录成功"}');            
          }
          // 2. 检查用户密码是否正确
          break;
        default:
          res.write('{"ok":false, "msg": "unknown"}')
      }
      res.end();
    } else {
      // read 文件
      let filepath = './www' + url;
      fs.readFile(filepath, (err, data)=>{
        if(err) {
          res.write('404');
        } else {
          res.write(data);
        }
        res.end();
      })
    }
    
  })
});

server.listen('3000', ()=>{
  console.log('running !');
});