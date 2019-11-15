var tbody = document.getElementById('tbody');
var end = document.getElementById('end');
var buttonReload = document.getElementById('reload');
var buttonExit = document.getElementById('exit');
var time = document.getElementById('time');

var wall = '<span data-att="wall"></span>';
var floor = '<span data-att="floor"></span>';
var deadlock = '<span data-att="deadlock"></span>';
var way = '<span data-att="way"></span>';
var exit = '<span data-att="exit"></span>';

var flagForAnimation = true;

var max =  17;

createField(max);

function createField(max)
{
    for(var j = 0; j < max; j++)
    {
        var tr = document.createElement('tr');
        var str = '';
        for(var i = 0; i < max; i++)
        {
            var cellClass;
            var cellType;
            var number = Math.round(2*Math.random());
            if(number == 0)
            {
                cellClass = "wall"
                cellType = wall;
            }
            else
            {
                cellClass = "floor"
                cellType = floor;
            }
            str += '<td class="'+cellClass+'">'+cellType+'</td>';
        }
        tbody.appendChild(tr);
        tr.innerHTML = str;
    }

    for(var i = 0; i < max; i++)
    {    
        tbody.children[0].children[i].innerHTML = wall;
        tbody.children[0].children[i].setAttribute('class','wall');

        tbody.children[i].children[0].innerHTML = wall;
        tbody.children[i].children[0].setAttribute('class','wall');

        tbody.children[max-1].children[i].innerHTML = wall;
        tbody.children[max-1].children[i].setAttribute('class','wall');

        tbody.children[i].children[max-1].innerHTML = wall;
        tbody.children[i].children[max-1].setAttribute('class','wall');
    }
    tbody.children[1].children[1].innerHTML = floor;
    tbody.children[1].children[1].removeAttribute('class');
    tbody.children[15].children[15].innerHTML = floor;
    tbody.children[15].children[15].removeAttribute('class');
    tbody.children[15].children[16].innerHTML = wall;
    tbody.children[15].children[16].setAttribute('class', 'exit');
    checkWay(1, 1, max);
}


function checkWay(a, b, max)
{
    var floorX = 0;
    var floorY = 0;
    tbody.children[a].children[b].innerHTML = way;
    if(checkFloor(a+1, b) == true)
    {
        floorX = a+1;
        floorY = b;
    }
    if(checkFloor(a-1, b) == true)
    {
        floorX = a-1;
        floorY = b;
    }

    if(checkFloor(a, b+1) == true)
    {
        floorX = a;
        floorY = b+1;
    }

    if(checkFloor(a, b-1) == true)
    {
        floorX = a;
        floorY = b-1;
    }
    if(floorX == 0 && floorY == 0 && a == 1 && b == 1)
    {
        location.reload();
        return;
    }
    if(floorX == 0 && floorY == 0)
    {
        tbody.children[a].children[b].innerHTML = deadlock;
         for(var j = 1; j < max - 1; j++)
        {
            for(var i = 1; i < max - 1; i++)
            {
                if(tbody.children[j].children[i].innerHTML == way)
                {
                    tbody.children[j].children[i].innerHTML = floor;
                }
            }
        }
        checkWay(1, 1, max);
        return;
    }

    if(floorX == max-2 && floorY == max-2)
    {
        return;
    }

    tbody.children[floorX].children[floorY].innerHTML = way;
    checkWay(floorX, floorY, max);
}

function checkFloor (a, b)
{
    if(tbody.children[a].children[b].innerHTML == floor)
    {
        return true;
    }
    else
    {
        return false;
    }
}

var cordPlayerX = 1;
var cordPlayerY = 1;
tbody.children[1].children[1].setAttribute('class', 'down');
tbody.children[15].children[16].innerHTML = exit;
var d1 = new Date();
//down
document.addEventListener('keydown', function(e)
{
    if(e.keyCode == 40 && flagForAnimation == true)
    {
        if(tbody.children[cordPlayerX+1].children[cordPlayerY].innerHTML != wall)
        {
            flagForAnimation = false;
            tbody.children[cordPlayerX].children[cordPlayerY].setAttribute('class','downAnimation');
            setTimeout(function()
            {
                tbody.children[cordPlayerX+1].children[cordPlayerY].setAttribute('class','down')       
                tbody.children[cordPlayerX].children[cordPlayerY].removeAttribute('class');
                cordPlayerX++;
                flagForAnimation = true;
            },380);            
        }
    }    
});
//up
document.addEventListener('keydown', function(e)
{
    if(e.keyCode == 38 && flagForAnimation == true)
    {
        if(tbody.children[cordPlayerX-1].children[cordPlayerY].innerHTML != wall)
        {
            flagForAnimation = false;
            tbody.children[cordPlayerX].children[cordPlayerY].setAttribute('class','upAnimation');
            setTimeout(function()
            {
                tbody.children[cordPlayerX-1].children[cordPlayerY].setAttribute('class','up')       
                tbody.children[cordPlayerX].children[cordPlayerY].removeAttribute('class');
                cordPlayerX--;
                flagForAnimation = true;
            },380);
        }        
    }
});
//right
document.addEventListener('keydown', function(e)
{
    if(e.keyCode == 39 && flagForAnimation == true)
    {
        if(tbody.children[cordPlayerX].children[cordPlayerY+1].innerHTML == exit)
        {
            flagForAnimation = false;
            var d2 = new Date();
    		var min = Math.trunc((d2-d1) / 60000);
    		var sec = Math.trunc(((d2-d1) - min*60000)/1000);
    		var sec = sec > 10 ? sec : '0'+sec;
            time.innerHTML = 'Your time: ' + min +':'+ sec;
            tbody.children[15].children[15].removeAttribute('class');
            end.setAttribute('class','endGame'); 
            return;           
        }       
        if(tbody.children[cordPlayerX].children[cordPlayerY+1].innerHTML != wall)
        {
            flagForAnimation = false;
            tbody.children[cordPlayerX].children[cordPlayerY].setAttribute('class','rightAnimation');
            setTimeout(function()
            {
                tbody.children[cordPlayerX].children[cordPlayerY+1].setAttribute('class','right')       
                tbody.children[cordPlayerX].children[cordPlayerY].removeAttribute('class');
                cordPlayerY++;
                flagForAnimation = true;
            },380);
            
        }        
    }    
});
// left
document.addEventListener('keydown', function(e)
{
    if(e.keyCode == 37 && flagForAnimation == true)
    {
        if(tbody.children[cordPlayerX].children[cordPlayerY-1].innerHTML != wall)
        {
            flagForAnimation = false;
            tbody.children[cordPlayerX].children[cordPlayerY].setAttribute('class','leftAnimation');
            setTimeout(function()
            {
                tbody.children[cordPlayerX].children[cordPlayerY-1].setAttribute('class','left')       
                tbody.children[cordPlayerX].children[cordPlayerY].removeAttribute('class');
                cordPlayerY--;
                flagForAnimation = true;
            },380);
        }               
    }    
});


buttonExit.addEventListener('click', function()
{
    window.close();
});

buttonReload.addEventListener('click', function()
{
    location.reload();
})