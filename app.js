var express = require('express');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(bodyParser.raw({
  type: 'image/png',
  limit: '10mb'
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
