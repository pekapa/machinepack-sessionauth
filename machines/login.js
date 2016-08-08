module.exports = {


  friendlyName: 'Log in',


  description: 'Log in as the specified user.',


  extendedDescription: 'Assumes that being "logged in" means that the session has a key called `me`.',


  habitat: 'sails',


  inputs: {

    id: {
      friendlyName: 'User ID',
      description: 'The unique ID to store in the session to represent this user.',
      example: 'ad913nfa0139ame2iekda13',
      required: true
    }

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

    // Set the "me" session key to the specified ID value, to indicate
    // that the user with that ID is "logged in".
    Session.save({
      key: 'me',
      value: inputs.id
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
