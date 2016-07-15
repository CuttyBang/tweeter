//GLOBAL find recommended users function

UserUtils = function(){};

UserUtils.findFollowings = function(username){
  let currentFollowings = Relationships.find({
    follower: username,
  }).fetch().map(function(data){
    return data.following;
  });
  currentFollowings.push(Meteor.user().username);
  return currentFollowings;
};
