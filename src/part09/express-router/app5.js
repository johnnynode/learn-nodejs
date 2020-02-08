const express = require('express');
const app = express();
const router = express.Router();


// 必须匹配 /abcd 才能访问
app.get('/abcd', (req, res)=>{
    res.send('1');
});

// 匹配 /abcd 以及 /abd
// 这里的c 可有可无
app.get('/abc?d', (req, res)=>{
    res.send('2');
});

// 匹配 /abcd
// 匹配 /abcccccd
// 备注：这里的c必须出现至少一次
app.get('/abc+d', (req, res)=>{
    res.send('3');
});

// 匹配 /abcd
// 匹配 /abcxyxyxd
// 备注：c和d之间可以是任意字符，但末尾必须是d
app.get('/abc\*d', (req, res)=>{
    res.send('4');
});

// 匹配 /abcd
// 匹配 /ad
// 备注：bc可以出现也可以不出现，出现的时候只能出现一次
app.get('/a(bc)?d', (req, res)=>{
    res.send('5');
});

// 匹配 /abcd
// 匹配 /abcbcd
// 备注：bc至少出现一次，多次出现时，bc必须成对出现
app.get('/a(bc)+d', (req, res)=>{
    res.send('6');
});

// 匹配 /ab1cd
// 匹配 /ab2cd
app.get('/\/ab[1,2]\/cd', (req, res)=>{
    res.send('7');
});

// 联合匹配，使用[]将多种一起匹配, 匹配任一个即匹配
app.get(['/a(bc)+d', '/\/ab[1,2]\/cd'], (req, res)=>{
    res.send('8');
});

app.listen(3000);