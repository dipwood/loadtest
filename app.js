
/**
 * Module dependencies.
 */

var express = require('express');

// define routes
var routes = require('./routes')
var start = require('./routes/start.js')
var load = require('./routes/load.js')
var newgame = require('./routes/newgame.js')
var game = require('./routes/game.js');

// declare variables for relevant dependencies
var cookieParser = require('cookie-parser')
var session = require('express-session')
var parseurl = require('parseurl')
var MongoStore = require('connect-mongo')(express);

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

  // session cookies are stored in mongo through MongoStore
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

  // allow use of session variables locally in views
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

// route templates. more detail in the relevant .js files

// routes for index
app.get('/', routes.index);
app.post('/', routes.index_post_handler);

// route for user creation
app.get('/start', start.start);

// routes for user loading, called from index and newgame routes
app.get('/load', load.load);
app.post('/load', load.load_post_handler);

// routes for new game creation, called from start route
app.get('/newgame', newgame.newgame);
app.post('/newgame', newgame.newgame_post_handler);

// routes for the actual game. called from load route
app.get('/game', game.game);
app.post('/game', game.game_post_handler);

// port 3000 used for this app. localhost:3000 is index
app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

