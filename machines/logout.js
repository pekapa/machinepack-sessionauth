module.exports = {


  friendlyName: 'Log out',


  description: 'Log the current user session out.',


  extendedDescription: 'Deletes the `me` key from the current user session.',


  habitat: 'sails',


  inputs: {

  },


  fn: function(inputs, exits, env) {

    // Import `machinepack-session`.
    var Session = require('machinepack-session');

    // Remove the `me` key from the session indicate that the requesting
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
