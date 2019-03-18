const request = require('request')
const crypto = require('crypto')
const OAuth = require('oauth-1.0a')
var express = require('express')
var app = express()
var cors = require('cors');

app.use(cors({origin: 'http://localhost:63342'}));
var config = require('./config')

function hash_function_sha1(base_string, key) {
  return crypto.createHmac('sha1', key).update(base_string).digest('base64');
}

const oauth = OAuth({
  consumer: {
    key: config.illuminateAuth.consumerKey,
    secret: config.illuminateAuth.consumerSecret
  },
  signature_method: 'HMAC-SHA1',
  hash_function(base_string, key) {
    return crypto.createHmac('sha1', key).update(base_string).digest('base64');
  }
});

const token = {
  key: config.illuminateAuth.userKey,
  secret: config.illuminateAuth.userSecret
};


app.get('/myGrades', function(req, res) {
  var page = req.query.page
  const request_data = {
    url: 'https://berkeley.illuminateed.com/dna/rest_server.php/Api/GradebookScores/?local_student_id=2011675&page=' + page,
    method: 'GET'
  }

  makeCall(res,request_data)

});

function makeCall(res,request_data) {

  request({
    url: request_data.url,
    method: request_data.method,
    form: request_data.data,
    headers: oauth.toHeader(oauth.authorize(request_data, token))
  }, function(error, response, body) {
    // Process your data here
    console.log(body)
    res.json(JSON.parse(body));
  })

}



app.listen(process.env.PORT || 3000, () => {
    console.log('meow')
})
