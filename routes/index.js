var Cookies = require( "cookies" )

exports.index = function(req, res){
  // console.log("We're in the index route. Cookie: ", req.cookies.managersession);
  // res.clearCookie('managersession');
  // res.cookies = null;
  // res.session = null;
  // res.clearCookie('managersession2');

  // userCookie = req.cookies.managersession
  // res.cookie('user', userCookie, { maxAge: 60000, httpOnly: true });
  
  // delete req.cookies;

  // res.clearCookie('user');
  // req.cookies = new Cookies(req, res);
  res.render('index', { title: 'Index' })
  // console.log("We're in the index route. Cookie: ", req.cookies.managersession);
  // req.cookies = new Cookies(req, res);
  // res.clearCookie('managersession');
  console.log("We're in the index route again. Cookie: ", req.cookies);
  // console.log("Cookies: ", req.cookies)
  console.log("Session: ", req.session)
};

// handler for form submitted from homepage
exports.index_post_handler = function(req, res)
	{
	res.render('testpage', { title: 'Test Page' });
	}