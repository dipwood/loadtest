var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

exports.load = function(req, res)
	{
	checkCookie(req, res);
	console.log("We're in the load route. Cookie: ", req.cookies.managersession);
	sessionID = req.session.id;
	console.log("Session ID: ", sessionID)
	res.render('load', { title: 'Load State'});
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
    		cookieDetails = req.cookies.managersession;
			db.collection('users').find({ "cookieDetails" : cookieDetails }, {$exists: true}).toArray(function (err, name) 
				{
      			if (!name) 
      				{
      				console.log("NO DAVID?!")
      				}
      			else
      				{
      				console.log("WELCOME BACK, ");
      				console.dir(name);
      				// console.log(req.session);
      				/*
      				if (name.cookieID != req.cookies.managersession)
      					{
      					req.session = name;
      					}
      				console.log(req.session);
      				*/
      				db.close();
      				}
      			})
			})
		}

	// else if no cookie data
	else
		{
		console.log("No cookie data");	
		// res.redirect('index', { title: 'Index' })
		}	
	};

exports.load_post_handler = function(req, res)
	{
	res.render('testpage', { title: 'Test Page' });
	}