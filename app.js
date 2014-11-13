var express = require('express');
var app = express();

var bodyParser = require('body-parser')
var _ = require('underscore');
var itemService = require('./itemService');

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', function(req, res){
  res.setHeader('Content-Type', 'application/json');
  res.send({a: 1});
});

app.post('/items', jsonParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);

  console.log(req.body);

  res.status(201).send(itemService.add(req.body));
});

app.get('/items/:id', function(req, res) {
  var item = itemService.get(req.params.id);

  item ? res.status(200).send(item) : res.sendStatus(404);
});

app.get('/items', function(req, res) {
  res.status(201).send(itemService.getAll());
});

app.post('/items/:id/priority', jsonParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);

  console.log(req.body);

  res.status(201).send(itemService.vote(req.params.id, req.body));
});

app.get('/rankedItems', function(req, res) {
  res.status(201).send(itemService.getRankedItems());
});

app.listen(3000, '0.0.0.0');
console.log('Express server started on port %s', 3000);