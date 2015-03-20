var express = require('express');
var cors = require('cors');
var path = require('path');
var bodyParser = require('body-parser')

var tankService = require('./tankService');
var rankingService = require('./rankingService');
var userService = require('./userService');

var app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/index.html', function(req, res){
  res.sendFile('index.html',{ root: path.join(__dirname, 'public') });
});

app.get('/', function(req, res){
  res.sendFile('index.html',{ root: path.join(__dirname, 'public') });
});

app.post('/tanks', function(req, res) {
  if (!req.body || !req.get('user-id')) return res.sendStatus(400); 

  res.status(201).send(tankService.create(req.body, req.get('user-id')));
});

app.get('/tanks', function(req, res) {
  res.status(200).json(tankService.getAll());
});

app.get('/tanks/:id', function(req, res) {
  var tank = tankService.get(req.params.id);

  tank ? res.status(200).send(tank) : res.sendStatus(404);
});

app.get('/tanks/:id/users', function(req, res) {
  var users = tankService.getTankUsers(req.params.id);

  res.status(200).send(users);
});

app.post('/tanks/:id/users', function(req, res) {
  if (!req.get('user-id')) return res.sendStatus(400);

  var user = tankService.addTankUser(req.params.id, req.get('user-id'));

  if (user) {
    return res.status(200).send(user);
  }

  res.sendStatus(404);
});

app.get('/tanks/:id/users/:userId', function(req, res) {
  var tankUser = tankService.getTankUser(req.params.id, req.params.userId);

  if (tankUser) {
    return res.status(200).send(tankUser);
  }

  res.sendStatus(404);
});

app.get('/tanks/:id/users/:userId/items', function(req, res) {
  res.status(200).send(tankService.getTankUserItems(req.params.id, req.get('user-id')));
});

app.post('/tanks/:id/items', function(req, res) {
  var item = tankService.addTankItem(req.params.id, req.body);

  if (item) {
    return res.status(200).json(item);
  }

  return res.sendStatus(400);
});

app.get('/tanks/:id/items', function(req, res) {
  var items = tankService.getTankItems(req.params.id);

  if (items) {
    return res.status(200).json(items);
  }

  return res.sendStatus(404);
});

app.get('/rankedItems', function(req, res) {
  var items = tankService.getAll();
  res.status(200).send(rankingService.getRankedItems(items));
});

app.post('/users', function(req, res) {
  var user = userService.add(req.body);

  if (user) {
    return res.status(200).json(user);
  }

  res.sendStatus(400);
});

app.get('/users', function(req, res) {
  res.status(200).send(userService.all());
});

app.get('/users/:userId', function(req, res) {
  var user = userService.get(req.params.userId);

  if (user) {
    return res.status(200).send(user);
  }

  res.sendStatus(404);
});

app.put('/users/:userId', function(req, res) {
  var user = userService.update(req.params.userId, req.body);

  if (user) {
    return res.status(200).send(user);
  }

  res.sendStatus(404);
});

app.delete('/users/:userId', function(req, res) {
  var success = userService.remove(req.params.userId);

  if (success) {
    return res.sendStatus(204);
  }

  res.sendStatus(404);
});

app.listen(3000, '0.0.0.0');
console.log('Express server started on port %s', 3000);
