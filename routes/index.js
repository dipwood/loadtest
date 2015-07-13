
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Index' })
};

// handler for form submitted from homepage
exports.index_post_handler = function(req, res)
	{
	res.render('testpage', { title: 'Test Page' });
	}