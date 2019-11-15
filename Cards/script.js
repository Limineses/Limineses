var container = document.body.children[0];
var buttonReload = document.getElementById('reload');
var buttonExit = document.getElementById('exit');
var click = document.getElementById('click');

var openPictures = 0;
var countDivs = 0
var countOfClick = 0;

var flagForAnimation = true;

var firstPicture ;
var secondPicture ;
var firstTarget;
var secondTarget;

var pictures = '112233445566778899';
var divs = '';

while(pictures != '')
{
	var randomNumber = Math.round(1+8*Math.random());
	if(pictures.indexOf(randomNumber) != -1)
	{
	pictures = pictures.replace(randomNumber, '');
	divs += '<div data-n="'+countDivs+'"class="close" id="pic'+randomNumber+'"></div>';
	countDivs++;
	}
}
container.innerHTML = divs;

container.addEventListener('mousedown', function(e)
{
	if(e.target.nodeName == 'DIV' && e.target !=container && flagForAnimation == true)
	{
		e.target.classList.toggle('close');
		firstPicture = e.target.id;
		firstTarget = e.target;
		openPictures++;
		countOfClick++;
	}
	if( firstPicture == secondPicture && secondTarget != firstTarget)
	{
		flagForAnimation = false;
		firstTarget.setAttribute('class', 'animation');
		secondTarget.setAttribute('class', 'animation');
		setTimeout(function()
		{
			firstTarget.outerHTML = '<span></span>';
			secondTarget.outerHTML = '<span></span>';
			clearTagAndPic();
			checkEndGame();
			setTimeout(function(){flagForAnimation = true;},1000);			
		},980);		
		return;
	}
	secondPicture = firstPicture;
	secondTarget = firstTarget;
	if(openPictures == 2)
	{
		flagForAnimation = false;
		setTimeout(function()
		{
			for(var i = 0; i < 18; i++)
			{
				if(container.children[i].nodeName == 'DIV')
				{
					container.children[i].setAttribute('class','close');
				}				
			}
			flagForAnimation = true;
		},500)
		clearTagAndPic();
	}

});

buttonExit.addEventListener('mousedown', function()
{
    window.close();
});

buttonReload.addEventListener('mousedown', function()
{
    location.reload();
})

function clearTagAndPic()
{
	secondTarget = null;
	firstTarget = null;
	secondPicture = null;
	firstPicture = null;
	openPictures = 0;
}
function checkEndGame()
{
	for(var i = 0; i < 18; i++)
	{
		if(container.children[i].nodeName == 'DIV')
		{
			return;
		}					
	}
	end.setAttribute('class','endGame');
	click.innerHTML = 'Your count of clicks: ' + countOfClick;
}