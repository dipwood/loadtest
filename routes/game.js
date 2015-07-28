// GET handler for the game.
exports.game = function(req, res)
	{
	res.render('game', { title: 'Game' , username: req.session.username})
	};
// POST handler for the game. currently unused
exports.game_post_handler = function(req, res)
	{
	res.render('game', { title: 'Game' , username: req.session.username})
	};