var _ = require('underscore');

var userRankings = {};

// {
//   "steven" : [
//     { "id" : "3", "title" : "c"},
//     { "id" : "2", "title" : "b"},
//     { "id" : "1", "title" : "a"}
//   ],
//   "sam" : [
//     { "id" : "3", "title" : "c"},
//     { "id" : "1", "title" : "a"},
//     { "id" : "4", "title" : "d"}
//   ]
// }

//Add or Update
exports.set = function(userId, rankings) {
  userRankings[userId] = rankings;
  return rankings;
};

exports.get = function(userId) {
  console.log('getting '+userId);
  return userRankings[userId];
};

exports.getAll = function() {
  return userRankings;
};
