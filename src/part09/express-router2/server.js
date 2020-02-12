var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var createFolder = (folder) => {
  try {
    fs.accessSync(folder);
  } catch(e) {
    fs.mkdirSync(folder);
  }
};

var uploadFolder = './upload/';

createFolder(uploadFolder);

var multer = require('multer');
var storage = multer.diskStorage({
  destination:(req, file, cb)=>{
    cb(null, uploadFolder);
  },
  filename:(req, file, cb)=>{
    cb(null, file.originalname);
  }
});
var upload = multer({storage: storage});

var app = express();

app.set('view engine', 'ejs'); //  模板引擎 1 设置

var urlencoded = bodyParser.urlencoded({extended:false}); // 只能处理url上的，不能处理json
var jsonParser = bodyParser.json(); // 处理json形式的post

app.get('/', (req, res) => {
  console.dir(req.query);
  res.send("home page");
});

// form submit like : x-www-form-urlencoded
app.post('/', urlencoded, (req, res) => {
  console.dir(req.body);
  res.send(req.body);
});

// like: json post
app.post('/upload', jsonParser, (req, res) => {
  console.dir(req.body);
  res.send(req.body);
});

app.get('/form', (req, res) => {
  // var form = fs.readFileSync('./views/form.html', {encoding:"utf8"});
  // res.send(form);
  res.sendFile(__dirname + './views/form.html');
});

// form ejs template
app.get('/ejsform/:name', (req, res) => {
  var name = req.params.name;
  res.render('form2', {name}); //  模板引擎 2 渲染
});

// like: form-data
app.post('/upload2', upload.single('logo'), (req, res) => {
  console.dir(req.body);
  res.send({'ret_code':0});
});

app.get('/profile/:id', (req, res) => {
  console.dir(req.params);
  res.send("profile page, id: " + req.params.id);
});

app.get('/multiprofile/:id/user/:u', (req, res) => {
  console.dir(req.params);
  res.send("profile page, id: " + req.params.id + " user: " + req.params.u);
});

// like abcd , acd // ? 0 or 1 b
app.get('/ab?cd', (req, res) => {
  res.send('/ab?cd');
});

// query like: /test/query?find=hot&sort=1
app.get('/test/query', (req, res) => {
  var json = req.query;
  res.send(json);
});

app.listen(3000, ()=>{
  console.log('server is on 3000 port');
});