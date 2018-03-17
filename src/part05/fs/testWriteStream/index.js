var fs = require('fs');

var myReadStream = fs.createReadStream(__dirname + '/hello.txt', 'utf8');
var myWriteStream = fs.createWriteStream(__dirname + '/hello.copy.txt');

var writeData = "hello world111";
myWriteStream.write(writeData); // 写文件
myWriteStream.end(); // 完成
myWriteStream.on('finish', ()=>{
  console.log('finished');
})