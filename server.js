const request = require('request');
const crypto = require('crypto');
const OAuth = require('oauth-1.0a');

function hash_function_sha1(base_string, key) {
  return crypto.createHmac('sha1', key).update(base_string).digest('base64');
}

const oauth = OAuth({
  consumer: {
    key: 'B58CAFBCF3A7',
    secret: '370596634ac2807300503a912c1dd9cdf9afb1b3'
  },
  signature_method: 'HMAC-SHA1',
  hash_function(base_string, key) {
    return crypto.createHmac('sha1', key).update(base_string).digest('base64');
  }
});

const request_data = {
  url: 'https://berkeley.illuminateed.com/dna/rest_server.php/Api/Sites/',
  method: 'GET'
};

// // Note: The token is optional for some requests
const token = {
  key: 'B58CAFBCF3A7',
  secret: '370596634ac2807300503a912c1dd9cdf9afb1b3'
};

request({
  url: request_data.url,
  method: request_data.method,
  form: oauth.authorize(request_data,token)
}, function(error, response, body) {
  // Process your data here
  console.log(response)
});
