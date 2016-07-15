import { Meteor } from 'meteor/meteor';
import { Tweets } from '../imports/collections/tweets.js';
import { Relationships } from '../imports/collections/relationships.js';

import '../imports/userUtils.js';

if(Meteor.isServer){
  Meteor.methods({
    'findUser'(username){
       return Meteor.users.findOne(
         {username: username},
         {fields: {'username': 1}
      });
    },
    'followUser'(username){
      Relationships.insert({
        follower: Meteor.user().username,
        following: username
      });
    },
    'reccomendedUsers'(){
      if(Meteor.user()){
        const currentFollowings = UserUtils.findFollowings(Meteor.user().username);
        const recUsers = Meteor.users.find({
          username: {$nin: currentFollowings}
        },{
          fields:{'username': 1},
          limit: 5
        }).fetch();
        return recUsers;
      }
    }
  });
}
