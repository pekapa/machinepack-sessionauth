module.exports = {


  friendlyName: 'Log out',


  description: 'Log the current user session out.',


  extendedDescription: 'Deletes the `me` key from the current user session.',


  habitat: 'sails',


  inputs: {

  },


  fn: function(inputs, exits, env) {

    // Import the `isObject` Lodash function.
    var _isObject = require('lodash.isobject');

    // If we don't have a request object in our environment, bail through the `error` exit.
    if (!_isObject(env.req) || !_isObject(env.req._sails) || env.req._sails.constructor.name !== 'Sails') {
      return exits.error(new Error('A valid Sails request object must be provided through `.setEnv()` in order to use this machine.'));
    }

    // Import `machinepack-session`.
    var Session = require('machinepack-session');

    // Remove the `me` key from the session to indicate that the requesting
    // user is now "logged out".
    Session.del({
      key: 'me'
    }).setEnvironment({
      req: env.req
    }).exec({
      // Forward errors through our `error` exit.
      error: exits.error,
      // Otherwise return through our `success` exit.
      success: exits.success
    });
  }
};
