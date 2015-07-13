// can i get to this from newgame.jade?

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