var path = require('path');
var SailsApp = require('sails').Sails;
var _ = require('lodash');

module.exports = {
  liftSails: function(opts, cb) {

    var Sails = new SailsApp();
    var app;
    if (typeof opts === 'function') {
      cb = opts;
      opts = {};
    }

    opts = _.extend({
      hooks: {grunt: false, views: false},
      log: {level: 'error'},
      globals: false,
      port: 1492
    }, opts);
    Sails.lift(opts, cb);
  },

  lowerSails: function(sails, cb) {
    sails.lower(function(err) {
      if (err) {return cb(err);}
      setTimeout(cb, 500);
    });
  }
};
