
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Index' })
  console.log("Cookies: ", req.cookies)
};

// handler for form submitted from homepage
exports.index_post_handler = function(req, res)
	{
	res.render('testpage', { title: 'Test Page' });
	}