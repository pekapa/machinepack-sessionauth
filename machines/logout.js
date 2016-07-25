module.exports = {


  friendlyName: 'Log out',


  description: 'Log the current user session out.',


  extendedDescription: 'Deletes the `me` key from the current user session.',


  habitat: 'sails',


  inputs: {

  },


  fn: function(inputs, exits, env) {
    var Session = require('machinepack-session');

    Session.del({
      key: 'me'
    }).setEnvironment({
      req: env.req
    }).exec({
      error: exits.error,
      success: exits.success
    });
  }
};
