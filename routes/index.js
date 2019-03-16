var express = require('express');
var debug = require('debug')('simplewebservice:server');
var Jimp = require('jimp');
var exhaustion = require('../methods/ExhaustResources.js');
var axios = require('axios');

const fs = require('fs');
const date = require('date-and-time');
const router = express.Router();

// returns an image
router.get('/', function (req, res) {
  var timestamp = new Date();
  res.download('routes/smiley.png');
  logRequest(req, res, timestamp);
});

// clear log files
router.get('/clearlog', function (req, res) {
  fs.writeFile('webaccess_log', "", function (err) {
    if (err) {
      debug("failed to clear log" + line);
    } else {
      debug("log succesfully cleared");
    }
    res.end("Log cleared");
    return;
  });
});

// clear log files
router.get('/getlog', function (req, res) {
  var timestamp = new Date();
  res.download('webaccess_log');
  logRequest(req, res, timestamp);
});

// invert effect on image
router.post('/b', function (req, res) {
  var timestamp = new Date();
  var image = req.body;

  try {
    Jimp.read(image, (err, input) => {
      if (err) throw err;
      input.invert();

      input.getBuffer(Jimp.AUTO, (err, output) => {
        if (err) throw err;

        res.writeHead(200, {'Content-Type': 'image/png'});
        res.end(output, 'binary');
      });
    });
  } catch (err) {
    res.status(400).send(`Error: ${err.message}`).end();
  }

  logRequest(req, res, timestamp);
});

// greyscale effect on image
router.post('/a', function (req, res) {
  var timestamp = new Date();
  var image = req.body;

  try {
    Jimp.read(image, (err, input) => {
      if (err) throw err;
      input.greyscale();

      input.getBuffer(Jimp.AUTO, (err, output) => {
        if (err) throw err;

        res.writeHead(200, {'Content-Type': 'image/png'});
        res.end(output, 'binary');
      });
    });
  } catch (err) {
    res.status(400).send(`Error: ${err.message}`).end();
  }

  logRequest(req, res, timestamp);
});

router.post('/exhaustCPU', (req, res) => {
  exhaustion.exhaustCPU().then(stdout => {
    var timestamp = new Date();
    var image = req.body;

    try {
      Jimp.read(image, (err, input) => {
        if (err) throw err;
        input.greyscale();

        input.getBuffer(Jimp.AUTO, (err, output) => {
          if (err) throw err;

          res.writeHead(200, {'Content-Type': 'image/png'});
          res.end(output, 'binary');
        });
      });
    } catch (err) {
      res.status(400).send(`Error: ${err.message}`).end();
    }

    logRequest(req, res, timestamp);
  }).catch(stderr => {
      res.status(400).send(`Error: ${stderr}`).end();
  });
});

router.post('/exhaustMEM', (req, res) => {
  exhaustion.exhaustMEM().then(stdout => {
    var timestamp = new Date();
    var image = req.body;

    try {
      Jimp.read(image, (err, input) => {
        if (err) throw err;
        input.blur(10);

        input.getBuffer(Jimp.AUTO, (err, output) => {
          if (err) throw err;

          res.writeHead(200, {'Content-Type': 'image/png'});
          res.end(output, 'binary');
        });
      });
    } catch (err) {
      res.status(400).send(`Error: ${err.message}`).end();
    }

    logRequest(req, res, timestamp);
  }).catch(stderr => {
    res.status(400).send(`Error: ${stderr}`).end();
  });
});

router.post('/exhaustNETIN', (req, res) => {
  exhaustion.exhaustNETIN().then(() => {
    var timestamp = new Date();
    var image = req.body;

    try {
      Jimp.read(image, (err, input) => {
        if (err) throw err;
        input.blur(10);

        input.getBuffer(Jimp.AUTO, (err, output) => {
          if (err) throw err;

          res.writeHead(200, {'Content-Type': 'image/png'});
          res.end(output, 'binary');
        });
      });
    } catch (err) {
      res.status(400).send(`Error: ${err.message}`).end();
    }

    logRequest(req, res, timestamp);
  }).catch(err => {
    res.status(400).send(`Error: ${err.message}`).end();
  });
});

router.post('/exhaustNETOUT', (req, res) => {
  exhaustion.exhaustNETOUT().then(() => {
    var timestamp = new Date();
    var image = req.body;

    try {
      Jimp.read(image, (err, input) => {
        if (err) throw err;
        input.blur(10);

        input.getBuffer(Jimp.AUTO, (err, output) => {
          if (err) throw err;

          res.writeHead(200, {'Content-Type': 'image/png'});
          res.end(output, 'binary');
        });
      });
    } catch (err) {
      res.status(400).send(`Error: ${err.message}`).end();
    }

    logRequest(req, res, timestamp);
  }).catch(err => {
    res.status(400).send(`Error: ${err.message}`).end();
  });
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
    if (err) {
      debug("failed to write log-event" + line);
    }
    return;
  });
}

module.exports = router;
