var express = require('express');
var cors = require('cors');
var path = require('path');
var bodyParser = require('body-parser')

var itemService = require('./itemService');
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

app.post('/items', function(req, res) {
  if (!req.body) return res.sendStatus(400);

  console.log(req.body);

  res.status(201).send(itemService.add(req.body));
});

app.get('/items/:id', function(req, res) {
  var item = itemService.get(req.params.id);

  item ? res.status(200).send(item) : res.sendStatus(404);
});

app.get('/items', function(req, res) {
  res.status(200).send(itemService.getAll());
});

app.post('/items/:id/priority', function(req, res) {
  if (!req.body) return res.sendStatus(400);

  console.log(req.body);

  var vote = itemService.vote(req.params.id, req.body);

  if (vote) {
    rankingService.invalidate();
  }

  res.status(201).send();
});

app.get('/rankedItems', function(req, res) {
  var items = itemService.getAll();
  res.status(200).send(rankingService.getRankedItems(items));
});

app.post('/users', function(req, res) {
  console.log(req.body);

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
