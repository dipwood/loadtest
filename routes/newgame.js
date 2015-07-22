var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

exports.newgame = function(req, res)
  {
  res.redirect('/');
  }

exports.newgame_post_handler = function(req, res)
  {
  console.log(req.body.user);
  name = req.body.user;
  cookieDetails = req.session.id;

  MongoClient.connect('mongodb://127.0.0.1:27017/users', function(err, db) 
    {
    if (err) throw err;
    console.log("Connected to Database");

    assert.equal(err, null);
    var userFinder = db.collection('users').find({ "name" : name, "cookieDetails" : cookieDetails});
    userFinder.nextObject(function(err, doc) 
      {
      assert.equal(err, null);
      if (doc != null) 
        {
        console.log("Found user!"); 
        console.dir(doc);
        db.close();
        } 
      else
        {
        console.log("Didn't find user.");
        db.collection('users').insertOne({ "name" : name , "cookieDetails": cookieDetails}),
        function(err, result) 
          {
          assert.equal(err, null);
          console.log("An error occurred while inserting new user.");
          callback(result);
          }
        console.log("Inserted a new user into the users collection.");
        db.close();
        }
      });
    /*
    db.collection('users').insertOne({ "name" : name , "cookieDetails": cookieDetails}),
    function(err, result) 
      {
      assert.equal(err, null);
      console.log("Inserted a new user into the users collection.");
      callback(result);
      }
    */
    /*
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
    */
    });
  res.render('testpage', { title: 'Test Page' });
  }
/*
function checkAnswer()
	{
	var result = $('#query').val();
    // var answer = document.getElementById(result);
   	if(result == 4) 
    	{
        console.log('Correct!');
      	}
      else 
      	{
        console.log('Sorry, try again!');
      	}
  	}
*/