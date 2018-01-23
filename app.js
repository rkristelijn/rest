let express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser');

let db = mongoose.connect('mongodb://localhost/bookAPI', { useMongoClient: true });

let app = express();
let port = process.env.PORT || 3100;

/**
 * @see https://github.com/expressjs/body-parser
 * Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option. This parser accepts only UTF-8 encoding of the body and supports automatic inflation of gzip and deflate encodings.
 * A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body). This object will contain key-value pairs, where the value can be a string or array (when extended is false), or any type (when extended is true).
 * 
 * Options
 * The urlencoded function takes an optional options object that may contain any of the following keys:
 * 
 * extended
 * The extended option allows to choose between parsing the URL-encoded data with the querystring library (when false) or the qs library (when true). The "extended" syntax allows for rich objects and arrays to be encoded into the URL-encoded format, allowing for a JSON-like experience with URL-encoded. For more information, please see the qs library.
 * 
 * Defaults to true, but using the default has been deprecated. Please research into the difference between qs and querystring and choose the appropriate setting.
 */
app.use(bodyParser.urlencoded({ extended: true }));
/**
 * Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option. This parser accepts any Unicode encoding of the body and supports automatic inflation of gzip and deflate encodings.
 * 
 * A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body).
 */
app.use(bodyParser.json());

let bookRouter = require('./books/book-router')();

app.use('/api', bookRouter);
app.get('/', function (req, res) {
  res.send('Welcome to my API!');
});

app.listen(port, function () {
  console.log('Running on PORT: ' + port);
});