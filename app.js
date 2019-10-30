var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var pe = require('parse-error');
var cors = require('cors');
var env = require('dotenv').config();
var bodyParser = require('body-parser');

var app = express();

// For BodyParser
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb'
}));
app.use(bodyParser.json({limit: '50mb'}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// CORS
app.use(cors());

// The main page
app.get('/', function(req, res) {
  res.statusCode = 200;
  res.json({
    success: true
  });
});


let main = require('./routes/main');

app.use('/v1', [main]);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  let errorMessage = {};
  errorMessage.message = err.message;
  errorMessage.error = req.app.get('env') === 'development' ? err : {};

  errorMessage.status = err.status || 500;

  res.json(errorMessage);
});

module.exports = app;



process.on('unhandledRejection', error => {
  console.error('Uncaught Error', pe(error));
});
