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

  res.status(201).send(tankService.addTankUser(req.params.id, req.get('user-id')));
});

app.get('/tanks/:id/users/:userId/items', function(req, res) {
  res.status(200).send(tankService.getTankUserItems(req.params.id, req.get('user-id')));
});

app.get('/rankedItems', function(req, res) {
  var items = tankService.getAll();
  res.status(200).send(rankingService.getRankedItems(items));
});

app.get('/ranks', function(req,res){
  var userRanks = userService.getAll();
  var ranked = rankingService.getRankedItems(userRanks);
  var rankedOut = ranked.map(function(aRank){
    return {
      "id" : aRank.id,
      "title" : aRank.title
    }
  })
  res.status(200).send(rankedOut);
});

app.get('/ranks/user/:userId', function(req,res){
  return res.send(userService.get(req.params.userId) || {});
});

app.post('/ranks/user/:userId', function(req, res){
  if (!req.body) return res.sendStatus(400);

  console.log(req.body);

  var ret = userService.set(req.params.userId, req.body);

  if (ret) return res.sendStatus(200);
  else return res.sendStatus(400);
});

app.listen(3000, '0.0.0.0');
console.log('Express server started on port %s', 3000);
