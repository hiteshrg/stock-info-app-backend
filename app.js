var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./utils/mongo-connection');
require('./utils/getLatestStockInfo');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user-router');
var stockRouter = require('./routes/stock-router');
var buyRouter = require('./routes/buy-router');
var sellRouter = require('./routes/sell-router');
var authRouter = require('./routes/auth-router');

// var usersRouter = require('./routes/user-router');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/stock', stockRouter);
app.use('/buy', buyRouter);
app.use('/sell', sellRouter);
app.use('/auth', authRouter)


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
