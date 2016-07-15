import { Meteor } from 'meteor/meteor';
import {Template} from 'meteor/templating';

import { Tweets } from '../../imports/collections/tweets.js';

import '../templates/main.html';
import './user-management.js';


if (Meteor.isClient) {
  Template.tweetBox.helpers({
    charCount: function() {
      return 140 - Session.get('numChars');
    },

    charClass: function() {
      if (Session.get('numChars') > 140) {
        return 'errCharCount';
      } else {
        return 'charCount';
      }
    },

    disableButton: function() {
      if (Session.get('numChars') <= 0 ||
          Session.get('numChars') > 140 ||
          !Meteor.user()){
        return 'disabled';
      }
    },
  });


  Template.tweetBox.events({
    'input #tweetText'(){
      Session.set('numChars', $('#tweetText').val().length);
    },

    'submit .tweeter'() {
      const tweet = $('#tweetText').val();
      Meteor.call('tweets.insert', tweet);
      $('#tweetText').val('');
      Session.set('numChars', 0);
    },
  });

  Template.tweetBox.onRendered(function () {
    Session.set('numChars', 0);
  });
}
