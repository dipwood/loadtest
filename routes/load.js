var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

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
    		var userFinder = db.collection('users').find({ "cookieDetails" : sessionID });
    		userFinder.nextObject(function(err, doc) 
      			{
      			assert.equal(err, null);
      			if (doc != null) 
       				{
       				req.session.username = doc.name; 
        			console.log("WELCOME BACK, ", req.session.username);
        			// req.session.username = doc.name; 
        			db.close();
        			res.redirect('/game');
        			} 
      			else
        			{
        			console.log("No user detected! Click to go back to index.");
        			db.close();
        			res.send('No save found! Click to <a href="/">return to the index</a>.');
        			// possible redirect option too
        			// res.redirect('/')
        			}
        		})
    		}
    	)}

	// else if no cookie data
	else
		{
		console.log("No cookie data");	
		res.redirect('/')
		}	
	};

exports.load_post_handler = function(req, res)
	{
	res.render('/', { title: 'Index' });
	}