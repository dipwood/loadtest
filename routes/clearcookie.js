var Cookies = require( "cookies" )
/*
 * GET home page.
 */

exports.clearcookie = function(req, res){
  // res.render('index', { title: 'Index' })
  // console.log("Cookies: ", req.cookies)
  // console.log("Session: ", req.session)
  console.log("We're inside the clearcookie.js route. Cookie: ", req.cookies)
  sessionID = req.session.id;
  console.log("Session: ", sessionID);
  res.clearCookie('managersession');
  // res.cookies = null;
  // res.session = null;
  // res.render('clearcookie');
  req.session.destroy();
  res.redirect('/');
};