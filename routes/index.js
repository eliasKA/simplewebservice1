var express = require('express');
var debug = require('debug')('simplewebservice:server');
var Jimp = require('jimp');
const fs = require('fs');
const date = require('date-and-time');
const router = express.Router();

// returns an image
router.get('/', function(req, res) {
  var timestamp = new Date();
  res.download('routes/smiley.png');
  logRequest(req, res, timestamp);
});

// invert colors of an image
router.post('/b', function(req, res) {
  var timestamp = new Date();
  var image = req.body;

  try{
    Jimp.read(image, (err, input) => {
      if (err) throw err;
      input.invert();

      input.getBuffer(Jimp.AUTO, (err, output) => {
        if(err) throw err;

        res.writeHead(200, {'Content-Type': 'image/png' });
        res.end(output, 'binary');
      });
    });
  }catch (err){
    res.status(400).send(`Error: ${err.message}`).end();
  }

  logRequest(req, res, timestamp);
});

// greyscale efffect on image
router.post('/a', function(req, res) {
  var timestamp = new Date();
  var image = req.body;

  try{
      Jimp.read(image, (err, input) => {
        if (err) throw err;
        input.greyscale();

        input.getBuffer(Jimp.AUTO, (err, output) => {
          if(err) throw err;

          res.writeHead(200, {'Content-Type': 'image/png' });
          res.end(output, 'binary');
        });
      });
  }catch (err){
    res.status(400).send(`Error: ${err.message}`).end();
  }

  logRequest(req, res, timestamp);
});

logRequest = function (req, res, now) {
  var ip = req.connection.remoteAddress;
  date.format(now, 'DD/MMM/YYYY:HH:mm:ss Z');

  var line = ip.toString()
    + " - - "
    + "[" + date.format(now, 'DD/MMM/YYYY:HH:mm:ss Z') + "]"
    + " "
    + "\"" + req.method
    + " " + req.url
    + " HTTP/" + req.httpVersion + "\""
    + " " + res.statusCode
    + " 1000" //needs to be changed once known what is needed to be here
  debug(line);
  fs.appendFile('webaccess_log', line + "\r\n", function (err, data) {
      if(err){
        debug("failed to write log-event" + line);
      }
      return;
  });
}

module.exports = router;
