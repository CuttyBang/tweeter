import { Meteor } from 'meteor/meteor';
import { Templates } from 'meteor/templating'

import '../../imports/startup/accounts.js';
import '../templates/main.html';

if(Meteor.isClient){
  Template.userManagement.events({

    'click #login'() {
      let username = $('#login-username').val();
      let password = $('#login-password').val();

      Meteor.loginWithPassword(username, password, function(error) {
        if(error) alert(error);
      });
    },

    'click #signup'(){
      let user = {
        username: $('#signup-username').val(),
        password: $('#signup-password').val(),
        profile: {
          fullname: $('#signup-fullname').val()
        }
      }
      Accounts.createUser(user, (error) => {
        if(error) alert(error);
      });
    },

    'click #logout'(){
      Meteor.logout();
    },

  });
}
