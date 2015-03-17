var _ = require('underscore');
var users = [];

function add(user) {
  if (!_.isObject(user)) {
    return;
  }

  users.push(_.extend(user, {
    id: _.uniqueId()
  }));

  return user;
};

function get(userId) {
  return _.findWhere(users, {
    id: userId
  });
};

function update(userId, user) {
  if (!_.isObject(user)) {
    return;
  }

  var existingUser = get(userId);

  if (!existingUser) {
    return;
  }

  users = _.without(users, existingUser);

  users.push(_.extend(user, {
    id: userId
  }));

  return user;
};

function remove(userId) {
  var user = _.findWhere(users, {
    id: userId
  });

  if (!user) {
    return false;
  }

  users = _.without(users, user);

  return true;
}

function all() {
  return _.sortBy(users, 'id');
};

module.exports = {
  add: add,
  get: get,
  update: update,
  remove: remove,
  all: all
}
