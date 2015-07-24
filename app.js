
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

// app.use(express.cookieParser('secret'));


var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

// Configuration

/*
var url = 'mongodb://localhost:27017/numbers';
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  db.close();
});
*/


/* express/session tests 
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'secret1',
  resave: true,
  saveUninitialized: true,
  rolling: true,
  name: 'managersession',
  unset: 'destroy',
  cookie: { maxAge: 2629746000 }
}));
*/
/*
app.use(session({
  genid: function(req) 
    {
    return genuuid() // use UUIDs for session IDs
    },
  resave: false,
  saveUninitialized: true,
  secret: 'secret1'
}))
*/

/* express/session tests 
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
*/
/*
var singleServer = {
  "db" : "sessions",
  "collection" : "express_sessions",
  "host" : "localhost",
  "port" : 27017
}
*/

/*
var conf = {
  db: {
    db: 'myDb',
    host: '127.0.0.1',
    port: 27017,  // optional, default: 27017
    // username: 'admin', // optional
    // password: 'secret', // optional
    collection: 'sessions' // optional, default: sessions
  },
  secret: '076ee61d63aa10a125ea872411e433b9'
};
*/

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





  /*
  app.use(express.session({
    secret: conf.secret,
    maxAge: new Date(Date.now() + 2629746000),
    store: new MongoStore(conf.db)
  });
*/


  /*
  app.use(express.session({
        secret: 'secret',
        store: new mongoStore({'db': 'sessions'})
    }));
  */
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

app.post('/load', load.load_post_handler);

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

app.get('/game', function(req, res)
  {
  //console.log("Cookies: ", req.cookies);
  //console.log("Cookie Value: ", req.cookies);
  if (req.cookies.remember) 
    {
    res.send('Remembered :). Click to <a href="/forget">forget</a>!.');
    } 
  else 
    {
    res.send('<form method="post"><p>Check to <label>'
      + '<input type="checkbox" name="remember"/> remember me</label> '
      + '<input type="submit" value="Submit"/>.</p></form>');
    // var sessionCookie = req.sessionID;
    // var sessionCookie2 = cookieParser.JSONCookies(sessionCookie);
    // var sessionCookie3 = sessionCookie2;
    // var sessionCookie2 = sessionCookie;
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


    /*
    conf.findOne(doc, function(err, result)
      { 
      sessionStore.destroy(result.session, function()
        {
        conf.update({_id: result._id}, {$set:{"session" : sid}});
        });
      });
    */
    /*
    conf.users.insert(document, {w: 1}, function(err, records)
      {
      console.log("Record added as "+records[0]._id);
      });
    */
    }
  });

app.get('/game2', function (req, res, next) {
  res.send('you viewed this page ' + req.session.views['/game2'] + ' times ' + req.cookies.get)
})

/*
app.post('/game', function(req, res){
  console.log("Cookies: ", req.cookies);
  var minute = 60 * 1000;
  if (req.body.remember) res.cookie('remember', 1, { maxAge: minute });
  res.redirect('back');
});
*/

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

/*
var dbUrl = 'mongodb://';
//dbUrl += conf.db.username + ':' + conf.db.password + '@';
dbUrl += conf.db.host + ':' + conf.db.port;
dbUrl += '/' + conf.db.db;
mongo.connect(dbUrl);
mongo.connection.on('open', function () {
  app.listen(3000);
});
*/


app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

