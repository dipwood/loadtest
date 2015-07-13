
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');
var cookieParser = require('cookie-parser')

var app = module.exports = express.createServer();

app.use(express.cookieParser('secret'));


var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

// Configuration

var url = 'mongodb://localhost:27017/numbers';
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  db.close();
});

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.post('/', routes.index_post_handler);

app.get('/loadgame', function (req, res) {
  res.render('loadgame', { title: 'Load Game' });
});

app.get('/newgame', function (req, res) {
  res.render('newgame', { title: 'New Game' });
});

/*
app.get('/game', function (req, res) {
  res.render('game', { title: 'New Game' });
});
*/

app.get('/game', function(req, res){
  if (req.cookies.remember) {
    res.send('Remembered :). Click to <a href="/forget">forget</a>!.');
  } else {
    res.send('<form method="post"><p>Check to <label>'
      + '<input type="checkbox" name="remember"/> remember me</label> '
      + '<input type="submit" value="Submit"/>.</p></form>');
  }
});

app.post('/game', function(req, res){
  var minute = 60 * 1000;
  if (req.body.remember) res.cookie('remember', 1, { maxAge: minute });
  res.redirect('back');
});

app.get('/forget', function(req, res){
  res.clearCookie('remember');
  res.redirect('back');
});

app.get('/testpage', function (req, res) {
  res.render('testpage', { title: 'Test Page' });
});

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
