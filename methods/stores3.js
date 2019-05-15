var fs = require('fs');
var axios = require('axios');
var FormData = require('form-data');
var rp = require('request-promise');
var util = require('util');
var exec = util.promisify(require('child_process').exec);

module.exports.store = (image, name) => {
  //only works on linux
  var tmp = '/simplewebservice1/public/tmp';
  fs.createWriteStream(tmp).write(image);
  
  return exec('aws s3 cp /simplewebservice1/public/tmp s3://ff-elias-test-bucket/test1/' + name);
}
