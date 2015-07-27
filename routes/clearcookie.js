var Cookies = require( "cookies" )
/*
 * GET home page.
 */

exports.clearcookie = function(req, res){
  console.log("We're inside the clearcookie.js route. Cookie: ", req.cookies)
  sessionID = req.session.id;
  console.log("Session: ", sessionID);
  res.clearCookie('managersession');
  req.session.destroy();
  res.redirect('/');
};