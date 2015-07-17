
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Index' })
  console.log("We're in the index route. Cookie: ", req.cookies.managersession);
  // console.log("Cookies: ", req.cookies)
  // console.log("Session: ", req.session)
};

// handler for form submitted from homepage
exports.index_post_handler = function(req, res)
	{
	res.render('testpage', { title: 'Test Page' });
	}