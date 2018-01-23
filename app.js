let express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser');
let env = {
  prod: 'mongodb://localhost/bookAPI',
  test: 'mongodb://localhost/bookAPI_test'
}
let dblink = env.prod;
if (process.env.ENV == 'Test') dblink = env.test;

let db = mongoose.connect(dblink, { useMongoClient: true });

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

module.exports = app;