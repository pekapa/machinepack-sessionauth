module.exports = {


  friendlyName: 'Check login status',


  description: 'Check whether the current user is logged in.',


  extendedDescription: 'Assumes that being "logged in" means that the session has a key called `me`.',


  environment: ['req'],


  iconSrc: '/images/icons/female_user.png',


  inputs: {},


  exits: {

    error: {
      description: 'Unexpected error occurred'
    },

    success: {
      friendlyName: 'logged in',
      description: 'Returns the ID of currently logged-in user.',
      example: '28ahgdalad9191djga'
    },

    otherwise: {
      friendlyName: 'not logged in',
      description: 'The requesting user is not logged in.'
    }

  },


  fn: function(inputs, exits, env) {
    var Session = require('machinepack-session');

    Session.load({
      key: 'me'
    }).setEnvironment({
      req: env.req
    }).exec({
      error: exits.error,
      notFound: function (){
        return exits.otherwise();
      },
      success: function (id){
        return exits.success(id);
      }
    });
  }


};
