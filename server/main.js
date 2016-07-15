import { Meteor } from 'meteor/meteor';
import { Tweets } from '../imports/collections/tweets.js';
import { Relationships } from '../imports/collections/relationships.js';

Meteor.startup(() => {
  // code to run on server at startup
  Relationships._ensureIndex({
    follower: 1,
    following: 1,
  }, {
    unique: 1
  });
});
