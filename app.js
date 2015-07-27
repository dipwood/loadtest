
/**
 * Module dependencies.
 */

var express = require('express');

var routes = require('./routes')
var start = require('./routes/start.js')
var load = require('./routes/load.js')
var clearcookie = require('./routes/clearcookie.js')
var newgame = require('./routes/newgame.js')
var game = require('./routes/game.js');


var cookieParser = require('cookie-parser')
var session = require('express-session')
var parseurl = require('parseurl')
var MongoStore = require('connect-mongo')(express);
var mongo = require('mongoose');

var app = module.exports = express.createServer();

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.set('trust proxy', 1) // trust first proxy
  app.use(session
    ({
    secret: 'secret1',
    resave: true,
    saveUninitialized: true,
    rolling: true,
    store: new MongoStore({
        url: 'mongodb://127.0.0.1:27017/login',
        autoRemove: 'disabled',
        collection: 'users',
        w:1,
    }),
    name: 'managersession',
    // unset: 'destroy',
    cookie: { maxAge: 2629746000 }
    }));
  app.use(function (req, res, next) {
  var views = req.session.views

  if (!views) {
    views = req.session.views = {}
  }

  // get the url pathname
  var pathname = parseurl(req).pathname

  // count the views
  views[pathname] = (views[pathname] || 0) + 1

  next()
  })
  app.use(function(req,res,next){
    res.locals.session = req.session;
    next();
  });
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

app.get('/start', start.start);

app.get('/load', load.load);

app.get('/clearcookie', clearcookie.clearcookie);

app.get('/newgame', newgame.newgame);

app.post('/newgame', newgame.newgame_post_handler);

app.get('/game', game.game);

app.post('/game', game.game_post_handler);

app.post('/load', load.load_post_handler);

app.get('/loadgame', function (req, res) {
  res.render('loadgame', { title: 'Load Game' });
});

app.get('/newgame', function (req, res) {
  res.render('newgame', { title: 'New Game' });
});

app.get('/game', function(req, res)
  {
  if (req.cookies.remember) 
    {
    res.send('Remembered :). Click to <a href="/forget">forget</a>!.');
    } 
  else 
    {
    res.send('<form method="post"><p>Check to <label>'
      + '<input type="checkbox" name="remember"/> remember me</label> '
      + '<input type="submit" value="Submit"/>.</p></form>');
    var doc = {name:"David", cookie: req.session, sessionID: req.sessionID};
    console.log(doc);

  MongoClient.connect('mongodb://127.0.0.1:27017/users', function(err, db) 
    {
    if (err) throw err;
    console.log("Connected to Database");

    db.createCollection("users", {strict:true}, function(err, collection)
      {
      if (err) throw err;

      console.log("Created users");
      console.log(collection);
      });
    });
    }
  });

app.get('/game2', function (req, res, next) {
  res.send('you viewed this page ' + req.session.views['/game2'] + ' times ' + req.cookies.get)
})

app.post('/game2', function(req, res){
  console.log("Cookies: ", req.cookies);
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

