// can i get to this from star.jade?

exports.newgame = function(req, res)
  {
  res.redirect('/');
  }

exports.newgame_post_handler = function(req, res)
  {
  // console.log(req.user);
  res.render('testpage', { title: 'Test Page' });
  }

function checkAnswer()
	{
	var result = $('#query').val();
    // var answer = document.getElementById(result);
   	if(result == 4) 
    	{
        console.log('Correct!');
      	}
      else 
      	{
        console.log('Sorry, try again!');
      	}
  	}