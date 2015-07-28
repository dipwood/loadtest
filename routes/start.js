var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

// this route is just for serving the user creation form
exports.start = function(req, res)
	{
  	res.render('start', { title: 'New Game' })
  	cookieID = req.cookies.managersession;
  	console.log("We're in the start route. Cookie: ", cookieID)
  	cookieDetails = req.session.id;
  	console.log("Session ID: ", cookieDetails);
	}