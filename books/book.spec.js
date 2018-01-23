let should = require('should'),
  sinon = require('sinon');

describe('Book Controller Tests', function () {
  describe('Post', function () {
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
  })
});