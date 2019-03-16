var fs = require('fs');
var axios = require('axios');
var FormData = require('form-data');
var rp = require('request-promise');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function ls() {
  const { stdout, stderr } = await exec('ls');
  console.log('stdout:', stdout);
  console.log('stderr:', stderr);
}
ls();

module.exports.exhaustCPU = () => {
  return exec('stress-ng --cpu 0 --cpu-method ackermann -t 15s');
}

module.exports.exhaustMEM = (x) => {
  return exec('stress-ng --vm 6 --vm-method ror -t 15s');
};

module.exports.exhaustNETIN = () => {
  return axios.all([
    axios.get('https://api.coinranking.com/v1/public/coin/1335/history/1y?base=EUR'),
    axios.get('https://api.coinranking.com/v1/public/coin/1335/history/1y?base=USD'),
    axios.get('https://api.coinranking.com/v1/public/coin/1335/history/1y?base=JPY'),
    axios.get('https://api.coinranking.com/v1/public/coin/1335/history/1y?base=BTC'),
    axios.get('https://api.coinranking.com/v1/public/coin/1335/history/1y?base=ETH'),
    axios.get('http://universities.hipolabs.com/search?country=united states'),
    axios.get('http://universities.hipolabs.com/search?country=morocco'),
    axios.get('http://universities.hipolabs.com/search?country=netherlands'),
    axios.get('http://universities.hipolabs.com/search?country=greece'),
    axios.get('http://universities.hipolabs.com/search?country=turkey'),
    axios.get('http://placekitten.com/200/300'),
    axios.get('http://placekitten.com/400/400'),
    axios.get('http://placekitten.com/200/200'),
    axios.get('http://placekitten.com/100/500'),
    axios.get('http://placekitten.com/400/800')
  ])
};

module.exports.exhaustNETOUT = (image) => {
  var options = { method: 'POST',
    url: 'https://file.io',
    headers:
      {'content-type': 'multipart/form-data' },
    formData:
      { file:
        { value: fs.readFileSync('./methods/file_50MB.zip'),
          options:
            { filename: 'ExhaustResources.js',
              contentType: null } } } };

  return rp(options);
};

