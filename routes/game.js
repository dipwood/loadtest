exports.game = function(req, res)
	{
	// session: req.session;
	res.render('game', { title: 'SC2 Manager' , session: req.session.username})
	};

exports.game_post_handler = function(req, res)
	{
	// session: req.session;
	res.render('game', { title: 'SC2 Manager' , session: req.session.username})
	};