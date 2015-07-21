var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

exports.start = function(req, res)
	{
  	res.render('start', { title: 'Login Page' })
  	cookieID = req.cookies.managersession;
  	console.log("We're in the start route. Cookie: ", cookieID)
  	cookieDetails = req.session.id;
  	console.log("Session ID: ", cookieDetails);
  	// console.log("Cookie Session: ", req.session)
 	// console.log("Session ID: ", req.sessionID)
 	// cookieID = req.cookies.managersession;
 	// cookieDetails = req.session.id;
 	// console.log("Cookies: ", cookieID)
 	// console.log("Cookie Session: ", cookieDetails)
 	/*
 	MongoClient.connect('mongodb://127.0.0.1:27017/users', function(err, db) 
    	{
    	if (err) throw err;
    	console.log("Connected to Database");

    	assert.equal(null, err);
    	db.collection('users').insertOne({ "name" : "David" , "cookieDetails": cookieDetails}),
  		function(err, result) 
  			{
    		assert.equal(err, null);
    		console.log("Inserted a new user into the users collection.");
    		callback(result);
    		}

    	var cursor = db.collection('users').find( );
   		cursor.each(function(err, doc) 
   			{
    		assert.equal(err, null);
     		if (doc != null) 
     			{
     			console.log("Found document.");	
        		console.dir(doc);
      			} 
      		else 
      			{
      			console.log("Didn't find document.");
      			db.close();	
    		  	// callback();
      			}
   			});
		});
	*/
	}