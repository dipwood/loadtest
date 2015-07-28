var Cookies = require( "cookies" )

exports.index = function(req, res)
	{
  res.render('index', { title: 'Index' })
  // cookies should be created and stored in mongo when index is first visited
	if (req.cookies.managersession) 
		{
    console.log("We remember.");
    } 
  else
    {
  	console.log("WE DON'T REMEMBER, DAWG");
    }
	console.log("We're in the index route. Cookie: ", req.cookies);
  sessionID = req.session.id;
	console.log("Session ID: ", sessionID)
	};

// this shouldn't ever be called, but just in case it will load the index
exports.index_post_handler = function(req, res)
	{
	res.render('index', { title: 'Index' })
	}