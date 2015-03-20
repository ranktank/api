var _ = require('underscore');

var tanks = [];

var createUser = function(tank, userId) {
  var user = {
    userId: userId,
    items: []
  };

  tank.items.forEach(addUserItem.bind(null, user));

  return user;
};

var createItem = function(item) {
  return _.extend(item, {
    _id: _.uniqueId()
  });
}

var get = function(id) {
  return _.findWhere(tanks, {
    id: id
  });
};

var getUser = function(tank, userId) {
  return tank && _.findWhere(tank.users, {
    userId: userId
  });
};

var addUserItem = function(user, item) {
  var positions = _.pluck(user.items, 'relativePosition');
  var top = positions.length ? Math.min.apply(null, positions) : Number.MAX_SAFE_INTEGER;
  var buffer = 10000;

  user.items.push({
    itemId: item._id,
    list: 'bank',
    relativePosition: top - buffer
  });
};

exports.create = function(tank, userId) {
  _.extend(tank, {
    id: _.uniqueId(),
    items: [],
    users: []
  });

  var user = createUser(tank, userId);

  tanks.push(tank);
  tank.users.push(user);

  return tank;
};

exports.get = get;

exports.getAll = function() {
  return tanks;
};

exports.getTankUsers = function(id) {
  var tank = get(id);
  return tank && tank.users;
};

exports.addTankUser = function(id, userId) {
  var tank = get(id);

  if (!tank) {
    return;
  }

  var existingUser = getUser(tank, userId);

  if (existingUser) {
    return existingUser;
  }

  var user = createUser(tank, userId);

  tank.users.push(user)

  return user;
};

exports.getTankUser = function(id, userId) {
  return getUser(get(id), userId);
};

exports.getTankUserItems = function(id, userId) {
  var user = getUser(get(id), userId);
  return user && user.items;
};

exports.addTankItem = function(id, data) {
  if (!_.isObject(data)) {
    return;
  }

  var tank = get(id);

  if (!tank) {
    return;
  }

  var item = createItem(data);

  tank.items.push(item);
  tank.users.forEach(function(user) {
    addUserItem(user, item);
  });

  return item;
};

exports.getTankItems = function(id) {
  var tank = get(id);
  return tank && tank.items;
};
