var express = require('express'),
  mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/bookAPI');
var Book = require('./books/book-model');
var app = express();
var port = process.env.PORT || 3100;

var bookRouter = express.Router();
bookRouter.route('/books')
  .get(function (req, res) {
    var responseJson = { hello: "This is my api" };
    res.json(responseJson);
  });

app.use('/api', bookRouter);
app.get('/', function (req, res) {
  res.send('Welcome to my API!');
});

app.listen(port, function () {
  console.log('Running on PORT: ' + port);
});