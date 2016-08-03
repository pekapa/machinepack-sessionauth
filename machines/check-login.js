module.exports = {


  friendlyName: 'Get logged-in user ID',


  description: 'Check whether the requesting user is currently logged in, and if so, return their ID.',


  extendedDescription: 'Assumes that being "logged in" means that the session has a key called `me`.',


  habitat: 'sails',


  inputs: {},


  exits: {

    success: {
      outputFriendlyName: 'Logged in user ID',
      outputDescription: 'The ID of the currently logged-in user.',
      outputExample: '28ahgdalad9191djga'
    },

    otherwise: {
      friendlyName: 'Not logged in',
      description: 'The requesting user is not logged in.'
    }

  },


  fn: function(inputs, exits, env) {

    // Import `machinepack-session`.
    var Session = require('machinepack-session');

    // Load the `me` key from the current session.
    Session.load({
      key: 'me'
    }).setEnvironment({
      req: env.req
    }).exec({
      // Forward errors through our `error` exit.
      error: exits.error,
      // If not such key was found, leave through the `otherwise` ext.
      notFound: function (){
        return exits.otherwise();
      },
      // Otherwise return the key's value (assumed to be the user's ID)
      // through the `success` exit.
      success: function (id){
        return exits.success(id);
      }
    });
  }


};
