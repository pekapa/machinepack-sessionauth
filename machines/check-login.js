module.exports = {


  friendlyName: 'Check login status',


  description: 'Check whether the current user is logged in.',


  extendedDescription: 'Assumes that being "logged in" means that the session has a key called `me`.',


  environment: ['req'],


  iconSrc: '/images/icons/female_user.png',


  defaultExit: 'success',


  inputs: {},


  exits: {

    error: {
      description: 'Unexpected error occurred'
    },

    success: {
      friendlyName: 'logged in'
    },

    otherwise: {
      friendlyName: 'not logged in'
    }

  },


  fn: function(inputs, exits, env) {
    var Session = require('machinepack-session');

    Session.get({
      key: 'me'
    }).setEnvironment({
      req: env.req
    }).exec({
      error: exits.error,
      success: function (id){
        if (id) {
          return exits.success();
        }
        return exits.otherwise();
      }
    });
  }


};
