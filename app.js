var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// var locationsRouter = require('./routes/locations');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/* to serve static objects from the /public/ dir, but to make them actually seem like they're coming from the top level. For example, the images directory is C:\node\nodetest1\public\images … but it is accessed at http://localhost:3000/images*/
app.use(express.static(path.join(__dirname, 'public')));

/*This is telling Express that requests to http://localhost:3000/ should use the index router ('./routes/index'), and requests to http://localhost:3000/users shold use the users router file. */
app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/locations', locationsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
