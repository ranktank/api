var _ = require('underscore');

var items = [];

var itemScore = function(item) {
  return (_.size(item.priorities) * _.size(item.priorities)) / _.reduce(item.priorities, function(memo, priority) {
    return memo + priority;
  }, 0);
};

var rankedScores = function() {
  var scores = {};

  _.chain(items).filter(function(item) {
    return _.size(item.priorities) > 0;
  }).each(function(item) {
    scores[itemScore(item)] = -1;
  }).value();

  _.chain(_.keys(scores)).sortBy(function(score) {
    return score;
  }).reverse().each(function(score, index) {
    scores[score] = index;
  }).value();

  return scores;
};

exports.add = function(item) {
  _.extend(item, {
    id: _.uniqueId(),
    priorities: {}
  });

  items.push(item);

  return item;
};

exports.get = function(id) {
  return _.findWhere(items, {
    id: id
  });
};

exports.getAll = function() {
  return items;
};

exports.vote = function(itemId, vote) {
  _.each(items, function(item) {
    if (_.has(item.priorities, vote.id)) {
      if (item.priorities[vote.id] >= vote.value) {
        item.priorities[vote.id]++;
      }
    }
  });

  var item = _.findWhere(items, {
    id: itemId
  });

  if (item) {
    item.priorities[vote.id] = vote.value;
  }

  return item;
};

exports.getRankedItems = function() {
  var scores = rankedScores();
  var rankedItems = _.chain(items).filter(function(item) {
    return _.size(item.priorities) > 0;
  }).map(function(item) {
    var score = itemScore(item);

    return _.extend({}, item, {
      score: score,
      rank: scores[score]
    });
  }).value();

  return rankedItems;
};