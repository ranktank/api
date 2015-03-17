var _ = require('underscore');

var tanks = [];

var createUser = function(userId) {
  return _.extend({}, {
    userId: userId,
    actions: [],
    items: []
  });
};

exports.create = function(tank, userId) {
  var user = createUser(userId);

  _.extend(tank, {
    id: _.uniqueId(),
    items: [],
    users: [createUser(userId)]
  });

  tanks.push(tank);

  return tank;
};

var get = function(id) {
  return _.findWhere(tanks, {
    id: id
  });
};

exports.get = get;

exports.getAll = function() {
  return tanks;
};

exports.getTankUsers = function(id) {
  var tank = get(id);
  return tank ? tank.users : undefined;
};

exports.addTankUser = function(id, userId) {
  var tank = get(id);
  var user = createUser(userId);

  tank.users.push(user)
};

exports.getTankUserItems = function(id) {
  var tank = get(id);
  return tank ? tank.items : undefined;
}; 
