import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/meteor'
export const Tweets = new Meteor.Collection("tweets");

if (Meteor.isServer) {
  Meteor.startup(function() {
    // code to run on server at startup
  });
}


Meteor.methods({

  'tweets.insert'(text){
    if(! this.userId){
      throw new Meteor.Error('You are not logged in');
    }

     Tweets.insert({
       message: text,
       createdAt: new Date(),
       user: Meteor.user().username
     });
  }

});
