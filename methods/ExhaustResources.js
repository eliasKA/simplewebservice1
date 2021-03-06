var fs = require('fs');
var axios = require('axios');
var FormData = require('form-data');
var rp = require('request-promise');
var util = require('util');
var exec = util.promisify(require('child_process').exec);

module.exports.exhaustCPU = () => {
  //only works on linux
  return exec('stress-ng --cpu 1 -t 20s');
}

module.exports.exhaustMEM = () => {
  //only works on linux
  return exec('stress-ng --vm 15 -t 20s');
};

module.exports.customCMD = (command) => {
  return exec(command);
};

module.exports.exhaustNETIN = () => {
  return axios.get("http://ipv4.download.thinkbroadband.com/50MB.zip");
};

