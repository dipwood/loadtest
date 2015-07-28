var express = require('express');
var router = express.Router();

// this route is just for serving the user creation form
router.get('/', function(req, res, next) 
	{
  	res.render('start', { title: 'New Game' })
  	cookieID = req.cookies.managersession;
  	console.log("We're in the start route. Cookie: ", cookieID)
  	cookieDetails = req.session.id;
  	console.log("Session ID: ", cookieDetails);
	})

module.exports = router;