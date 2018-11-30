var express = require('express');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');

var app = express();

app.use(bodyParser.raw({
  type: 'image/png',
  limit: '10mb'
}));

app.use('/', indexRouter);

module.exports = app;
