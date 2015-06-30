module.exports = {


  friendlyName: 'Log in',


  description: 'Log in as the specified user.',


  extendedDescription: 'Assumes that being "logged in" means that the session has a key called `me`.',


  environment: ['req'],


  inputs: {

    id: {
      friendlyName: 'User ID',
      description: 'The unique ID to store in the session to represent this user.',
      example: 'ad913nfa0139ame2iekda13',
      required: true
    }

  },


  exits: {

    error: {
      description: 'Unexpected error occurred'
    },

    success: {
      friendlyName: 'then'
    }

  },


  fn: function(inputs, exits, env) {
    var Session = require('machinepack-session');

    Session.save({
      key: 'me',
      value: inputs.id
    }).setEnvironment({
      req: env.req
    }).exec({
      error: exits.error,
      success: exits.success
    });
  }


};
