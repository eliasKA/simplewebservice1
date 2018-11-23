var express = require('express');
var Jimp = require('jimp');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  return res.download('routes/smiley.png');
});

router.post('/a', function(req, res) {
  var image = req.body;

  try{
      Jimp.read(image, (err, input) => {
        if (err) throw err;
        input.greyscale();

        input.getBuffer(Jimp.AUTO, (err, output) => {
          if(err) throw err;

          res.writeHead(200, {'Content-Type': 'image/png' });
          return res.end(output, 'binary');
        });
      });
  }catch (err){
      return res.status(400).send(`Error: ${err.message}`).end();
  }
});

module.exports = router;
