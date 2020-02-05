var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var router = express.Router({
  mergeParams: true, // 配置父级路由信息是否共享, 默认false
  caseSensitive: true, // 配置路由的路径大小写是否区分, 默认false
  strict: true // 配置是否区分严格模式 /test 和 /test/是完全不一样的
});

// 也可以使用下面app.set的方式来配置
// app.set('strict routing', true);
// app.set('case sensitive routing', true);

app.get('/user/:name/:group', function(req, res, next) {
let name = req.params.name;
let group = req.params.group;

console.log(name, group);
next();
});

app.use('/user/:name/:group', router);

router.get('/', function(req, res) {
  res.send('router info: ' + req.params.name + ' ' + req.params.group); // 上面配置过即可获取信息
});

router.get('/test', function(req, res) {
  res.send('router test info: ' + req.params.name + ' ' + req.params.group); // 上面配置过即可获取信息
});

router.get('/TEst', function(req, res) {
  res.send('router TEst info: ' + req.params.name + ' ' + req.params.group); // 上面配置过即可获取信息
});

router.get('/test/', function(req, res) {
  res.send('router test/ info: ' + req.params.name + ' ' + req.params.group); // 上面配置过即可获取信息
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
