var tbody = document.getElementById('tbody');
var setSize = document.getElementById('setSize');
var text = document.getElementById('text');
var reload = document.getElementById('reload');

var wall = '<span data-att="wall"></span>';
var floor = '<span data-att="floor"></span>';
var deadlock = '<span data-att="deadlock"></span>';
var way = '<span data-att="way"></span>';

var max =  +prompt('Enter field size');

createField(max);

function createField(max)
{
    max += 2;
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
        for(var j = 1; j < max - 1; j++)
        {
            for(var i = 1; i < max - 1; i++)
            {
                if(tbody.children[j].children[i].innerHTML == way)
                {
                    tbody.children[j].children[i].setAttribute('class','way');               
                }
            }
        }
        tbody.children[floorX].children[floorY].setAttribute('class','way');
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

setSize.addEventListener('click', function()
{
    if(text.value != '')
    {
        tbody.innerHTML = '';
        max = +text.value;
        text.value = '';
        createField(max);
    }   
});

reload.addEventListener('click', function()
{
    tbody.innerHTML = '';
    createField(max);
});