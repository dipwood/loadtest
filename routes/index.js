var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) 
	{
	res.render('index', { title: 'Index' })
	if (req.cookies.managersession) 
		{
    	console.log("We remember.")
    	} 
  	else
    	{
  		console.log("WE DON'T REMEMBER, DAWG");
    	}
	console.log("We're in the index route. Cookie: ", req.cookies)
	sessionID = req.session.id;
	console.log("Session ID: ", sessionID)
	})

module.exports = router;
