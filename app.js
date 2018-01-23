let express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser');

let db = mongoose.connect('mongodb://localhost/bookAPI', { useMongoClient: true });

let app = express();
let port = process.env.PORT || 3100;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let bookRouter = require('./books/book-router')();
app.use('/api/books', bookRouter);

app.get('/', function (req, res) {
  res.send('Welcome to my API!');
});

app.listen(port, function () {
  console.log('Running on PORT: ' + port);
});