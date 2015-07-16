var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

exports.start = function(req, res)
	{
  	res.render('start', { title: 'Login Page' })
  	// console.log("Cookies: ", req.cookies.managersession)
  	// console.log("Cookie Session: ", req.session)
 	// console.log("Session ID: ", req.sessionID)
 	cookieID = req.cookies.managersession;
 	cookieDetails = req.session;
 	// console.log("Cookies: ", cookieID)
 	// console.log("Cookie Session: ", cookieDetails)

 	MongoClient.connect('mongodb://127.0.0.1:27017/login', function(err, db) 
    	{
    	if (err) throw err;
    	console.log("Connected to Database");

    	assert.equal(null, err);
    	db.collection('users').insertOne({ "name" : "David" , "cookieID" : cookieID, "cookieDetails": cookieDetails}),
  		function(err, result) 
  			{
    		assert.equal(err, null);
    		console.log("Inserted a document into the users collection.");
    		callback(result);
    		}

    	var cursor = db.collection('users').find( );
   		cursor.each(function(err, doc) 
   			{
    		assert.equal(err, null);
     		if (doc != null) 
     			{
        		console.dir(doc);
        		console.log("Found document.");	
      			} 
      		else 
      			{
      			console.log("Didn't find document.");	
    		  	// callback();
      			}
   			});	
    	/*
    	insertUser(db, function() 
  			{
   			db.close();
  			}, cookieID, cookieDetails);
    	findUser(db, function() 
    		{
      		db.close();
  			});
  		*/
		});

 	var insertUser = function(db, callback, cookieID, cookieDetails) 
		{
  		db.collection('users').insertOne( { "test" : "test1", "testA" : "test2" } ),
  		function(err, result) 
  			{
    		assert.equal(err, null);
    		console.log("Inserted a document into the restaurants collection.");
    		callback(result);
    		}
		}	

	// testing purposes
	var findUser = function(db, callback) 
		{
   		var cursor = db.collection('users').find( );
   		cursor.each(function(err, doc) 
   			{
    		assert.equal(err, null);
     		if (doc != null) 
     			{
        		console.dir(doc);
        		console.log("Found document.");	
      			} 
      		else 
      			{
      			console.log("Didn't find document.");	
    		  	callback();
      			}
   			});
		};
	}