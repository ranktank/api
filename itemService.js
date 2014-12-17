var _ = require('underscore');

var items = [];

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

exports.byUser = function(userId) {
  var uItems = items.filter(function(item){
    return item.priorities.hasOwnProperty(userId);
  })
  .map(function(item){
    return {
      "id" : item.id,
      "title" : item.title
    }
  });

  return uItems;
};
