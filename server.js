var express = require('express');
var bodyParser = require('body-parser');
var sync = require('synchronize');
var cors = require('cors');

// Since Mixmax calls this API directly from the client-side, it must be whitelisted.
var corsOptions = {
  origin: /^[^.\s]+\.mixmax\.com$/,
  credentials: true
};

var app = express();

// Use fibers in all routes so we can use sync.await() to make async code easier to work with.
app.use(function(req, res, next) {
  sync.fiber(next);
});

//we do not use hints
app.get('/typeahead', cors(corsOptions), require('./api/typeahead'));
app.get('/resolver', cors(corsOptions), require('./api/resolver'));

if (process.env.PROD) {
  app.listen(process.env.PORT || 9146);
} else {
  var pem = require('pem');
  var https = require('https');
  var fs = require('fs');
  var options = {
   key  : fs.readFileSync('server.key'),
   cert : fs.readFileSync('server.crt')
};
  pem.createCertificate({days:1, selfSigned:true}, function(err, keys){
    https.createServer(options,app).listen(process.env.PORT || 9146);
  });
}

