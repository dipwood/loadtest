var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

// load user information if their session cookie exists in db
exports.load = function(req, res)
	{
	checkCookie(req, res);
	console.log("We're in the load route. Cookie: ", req.cookies.managersession);
	sessionID = req.session.id;
	console.log("Session ID: ", sessionID)
	};

function checkCookie(req, res)
	{
	// if cookie data exists
	if (req.session && req.cookies.managersession)
		{
		MongoClient.connect('mongodb://127.0.0.1:27017/users', function(err, db) 
    		{
    		if (err) throw err;
    		console.log("Connected to Database");
        assert.equal(err, null);

        // find the user based on session id
    		var userFinder = db.collection('users').find({ "cookieDetails" : sessionID });
    		userFinder.nextObject(function(err, doc) 
      			{
      			assert.equal(err, null);
      			if (doc != null) 
       				{
       				req.session.username = doc.name; 
        			console.log("WELCOME BACK, ", req.session.username);
        			db.close();
        			res.redirect('/game');
        			} 
      			else
        			{
              // goes back to index if user isn't found
        			console.log("No user detected! Click to go back to index.");
        			db.close();
        			res.send('No save found! Click to <a href="/">return to the index</a>.');
        			}
        		})
    		}
    	)}

	// else if no cookie data, redirect to index
	else
		{
		console.log("No cookie data");	
		res.redirect('/')
		}	
	};

// shouldn't be called, redirect to index just in case
exports.load_post_handler = function(req, res)
	{
	res.render('/', { title: 'Index' });
	}