var assert = require('assert');
var SessionAuth = require('../');
var lifecycle = require('./helpers/lifecycle');

describe('machinepack-sessionauth: logout', function() {

  var app;
  before(function(done) {
    lifecycle.liftSails({
      routes: {
        '/login': function(req, res) {
          req.session.me = 123;
          return res.ok();
        },
        '/logout': function(req, res) {
          SessionAuth.logout()
          .setEnvironment({req: req})
          .exec({
            success: res.ok,
            error: res.serverError
          });
        },
        '/session': function(req, res) {
          return res.json(req.session);
        },

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

    it('should "log the user out" by clearing the correct session key', function(done) {

      app.request({
        url: '/login',
        method: 'get'
      }, function(err, res, body) {
        if (err) {return done(err);}
        // Get the cookie out of the response
        var cookie = res.headers['set-cookie'][0].split(';')[0];
        app.request({
          url: '/session',
          method: 'get',
          // Send the cookie w/ the request
          headers: {
            cookie: cookie
          }
        }, function(err, res, body) {
          if (err) {return done(err);}
          assert.equal(body.me, 123);
          app.request({
            url: '/logout',
            method: 'get',
            // Send the cookie w/ the request
            headers: {
              cookie: cookie
            }
          }, function(err, res, body) {
            if (err) {return done(err);}
            app.request({
              url: '/session',
              method: 'get',
              // Send the cookie w/ the request
              headers: {
                cookie: cookie
              }
            }, function(err, res, body) {
              if (err) {return done(err);}
              assert.equal(typeof body.me, 'undefined');
              return done();
            });
          });
        });

      });

    });

  });

});
