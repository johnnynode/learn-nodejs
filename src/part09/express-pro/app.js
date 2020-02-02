var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var db = require('./db');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* old advance
app.use('/', indexRouter);
app.use('/users', usersRouter);
*/

// new
app.get('/', function(req, res) {
  // res.render('./views/index') // express 自动查找views目录 不要这样写, 会报错
  res.render('index', {list: db.list})
});

app.get('/get/:i', function(req, res) {
  let i = req.params.i;
  let one = db.get(i);
  res.send(one);
});

app.post('/add', function(req, res) {
  db.add({title: req.body.title});
  res.redirect('/');
});

app.get('/del', function(req, res) {
  let i = req.query.i;
  db.del(i);
  res.redirect('/');
});

app.post('/update', function(req, res) {
  let i = req.body.i;
  let title = req.body.title;
  db.update(i, {title});
  res.redirect('/');
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
