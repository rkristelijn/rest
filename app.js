var express = require('express');

var app = express();

var port = process.env.PORT || 3100;

app.get('/', function(req, res) {
  res.send('Welcome to my API!');
});

app.listen(port, function(){
  console.log('Running on PORT: ' + port);
});