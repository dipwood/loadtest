
/*
 * GET home page.
 */

exports.clearcookie = function(req, res){
  // res.render('index', { title: 'Index' })
  // console.log("Cookies: ", req.cookies)
  // console.log("Session: ", req.session)
  console.log("We're inside the clearcookie.js route. Cookie: ", req.cookies.managersession)
  // res.render('index', { title: 'Index' })

  res.clearCookie('managersession', { path: '/'});
  // res.session.destroy();
  res.session = null;
  res.cookies = null;
  req.headers.cookie = null;

  req.session.destroy(function() {
    res.clearCookie('connect.sid', { path: '/' });
});
/*
  req.session.destroy(function() {
    res.clearCookie('managersession', { path: '/' });
});
*/
  console.log("Is it gone now? Cookie: ", req.cookies.managersession)
  // req.cookies.managersession = null;
  // req.session.destroy();


  // req.cookies.destroy();

  /*
  req.session.destroy(function()
  	{
  	delete req.cookies.managersession;
  	res.clearCookie('connect.sid', { path: '/' });
  	res.redirect('/');
  	})
  */
  // res.redirect('/');
  res.render('clearcookie');
};