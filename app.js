var express = require('express'),
  mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/bookAPI');


var Book = require('./books/book-model');
var app = express();
var port = process.env.PORT || 3100;

var bookRouter = express.Router();
bookRouter.route('/books')
  .get(function (req, res) {
    let query = {};
    if(req.query.genre) query.genre = req.query.genre;
    console.log(query);
    Book.find(query, function (err, books) { 
      if(err) res.status(500).send(err);
      else res.json(books);
    });
  });
bookRouter.route('/books/:bookId')
.get(function (req, res) {
  Book.findById(req.params.bookId, function (err, book) { 
    if(err) res.status(500).send(err);
    else res.json(book);
  });
});
app.use('/api', bookRouter);
app.get('/', function (req, res) {
  res.send('Welcome to my API!');
});

app.listen(port, function () {
  console.log('Running on PORT: ' + port);
});