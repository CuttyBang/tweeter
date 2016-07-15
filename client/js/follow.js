import { Meteor } from 'meteor/meteor';
import {Template} from 'meteor/templating';

import '../templates/follow.html';
import './user-management.js';

if (Meteor.isClient) {
  Template.follow.helpers({
    'foundUser'(){
      return Session.get('foundUser');
    },

    'recommendedUsers'(){
      return Session.get('reccomendedUsers');
    }
  });

  Template.follow.events({
    'submit form'(event){
       const searchUser = event.target.searchUser.value;
       const foundUser = Meteor.call('findUser', searchUser, (error, result)=>{
         if(res) Session.set('foundUser', res);
       });
       return false;
    },
    'click #follow'(){
      Meteor.call('followUser', Session.get('foundUser').username);
    },
    'click #followRec'(event){
      Meteor.call('followUser', this.username)
    },
  });

  Template.follow.onRendered(()=>{
    Meteor.call('recommendedUsers', (err,res)=>{
      Session.set('recommendedUsers', res);
    });
  });
}
