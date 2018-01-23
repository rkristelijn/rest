let should = require('should'),
  sinon = require('sinon');

describe('Book Controller Tests', function () {
  describe('post', function () {
    it('should not allow an empty title on post', function () {
      let MockBook = function (book) {
        this.save = function () { }
      };
      let req = {
        body: {
          author: 'Jon'
        }
      }
      let res = {
        status: sinon.spy(),
        send: sinon.spy()
      }

      let bookController = require('./book-controller')(MockBook);
      bookController.post(req, res);

      res.status.calledWith(400).should.equal(true, 'Bad Status ' + res.status.args[0][0]);
      res.send.calledWith('Title is required').should.equal(true);
    });
  });
  describe('get', function () {
    xit('should send 500', function () {
      let MockBook = function (book) {
        //Book.find is not a function...
          this.find = function (query, callback) { }
        };
      let res = {
        send: sinon.spy(),
        status: sinon.spy(),
        body: '',
        json: function (passedBook) { this.body = passedBook; }
      };
      let bookController = require('./book-controller')(MockBook);
      let req = {
        query: {
          genre: 'Historical Fiction'
        }
      }
      bookController.get(req, res);

      res.status.calledWith(500).should.equal(true, 'User too ugly ' + res.status.args[0][0]);
    });
  });
  describe('getOne', function () {
    it('should get one books with properties _id, title, genre, author, read', function () {
      let MockBook = function (book) {
        this.save = function () { }
      };
      let req = {
        headers: {
          host: '192.168.0.3:3100'
        },
        book: {
          toJSON() {
            return {
              '_id': '5a66cb21081624a89cf724e7',
              'title': 'War and Peace',
              'genre': 'Historical Fiction',
              'author': 'Lev Nikolayevich Tolstoy',
              'read': false
            }
          }
        }
      };
      let res = {
        body: '',
        json: function (passedBook) { this.body = passedBook; }
      };

      let bookController = require('./book-controller')(MockBook);
      bookController.getOne(req, res);

      res.body.should.have.properties(['_id', 'title', 'genre', 'author', 'read']);
    });
    it('should get one books with hyperlink (HATEOAS)', function () {
      let MockBook = function (book) {
        this.save = function () { }
      };
      let req = {
        headers: {
          host: '192.168.0.3:3100'
        },
        book: {
          toJSON() {
            return {
              '_id': '5a66cb21081624a89cf724e7',
              'title': 'War and Peace',
              'genre': 'Historical Fiction',
              'author': 'Lev Nikolayevich Tolstoy',
              'read': false
            }
          }
        }
      };
      let res = {
        body: '',
        json: function (passedBook) { this.body = passedBook; }
      }

      let bookController = require('./book-controller')(MockBook);
      bookController.getOne(req, res);

      res.body.should.have.property('links');
      res.body.links.should.property('filterByThisGenre');
      res.body.links.filterByThisGenre.should.be.equal('http://192.168.0.3:3100/api/books/?genre=Historical%20Fiction');
    });
  });
});