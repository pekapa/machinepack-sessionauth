var assert = require('assert');
var SessionAuth = require('../');
var lifecycle = require('./helpers/lifecycle');

describe('machinepack-sessionauth: check-login', function() {

  var app;
  before(function(done) {
    lifecycle.liftSails({
      routes: {
        '/login': function(req, res) {
          req.session.me = 123;
          return res.ok();
        },
        '/checkLogin': function(req, res) {
          SessionAuth.checkLogin()
          .setEnvironment({req: req})
          .exec({
            success: res.ok,
            otherwise: function() {return res.ok('nobody here');},
            error: res.serverError
          });
        }
      }
    },function(err, _sails) {
      if (err) {return done(err);}
      app = _sails;
      return done();
    });
  });

  after(function(done) {
    lifecycle.lowerSails(app, done);
  });


  describe('with valid inputs', function() {

    it('should return the ID of the currently-logged in user (if there is one)', function(done) {

      app.request({
        url: '/login',
        method: 'get'
      }, function(err, res, body) {
        if (err) {return done(err);}
        // Get the cookie out of the response
        var cookie = res.headers['set-cookie'][0].split(';')[0];
        app.request({
          url: '/checkLogin',
          method: 'get',
          // Send the cookie w/ the request
          headers: {
            cookie: cookie
          }
        }, function(err, res, body) {
          if (err) {return done(err);}
          assert.equal(body, 123);
          return done();
        });
      });

    });

    it('should return through the `otherwise` exit if no-one is logged in', function(done) {

      app.request({
        url: '/checkLogin',
        method: 'get'
      }, function(err, res, body) {
        if (err) {return done(err);}
        assert.equal(body, 'nobody here');
        return done();
      });

    });


  });

});
