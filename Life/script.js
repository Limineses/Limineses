var N = 30; // row
var M = 30; // col
var world = document.getElementById("world");
var life = [];
var dead = [];
var respawn = '<img src="ico/respawn.png">';
var mustDie = '<img src="ico/cross.png">';  
var lives = '<img src="ico/lives.png">';
var swapForAnimation = 1; // счётчик для кнопки анимации
var swapStart = 0; // счётчик для кнопки старта
var count = 0 // счётчик для кнопки шагов
var swapForSpeed1 = 0;
var swapForSpeed2 = 0;
var swapForSpeed3 = 0;

for (var i = 0; i <= M; i++)
{
    var div = document.createElement("div");
    div.setAttribute("class","col");
    world.appendChild(div);
}

for(var i = 0; i <= M; i++)
{
    var col = world.children[i];
    for(var j = 0; j <= N; j++)
    {
        var div = document.createElement("div");
        div.setAttribute("id", j+"/"+i);
        col.appendChild(div);
        (function(e)
        {
            e.addEventListener('mousedown', function()
                {e.innerHTML = lives;});
            e.addEventListener('wheel', function()
                {e.innerHTML = '';});
        })(div);
    }
}

var startPoints = [7,6,8,7,9,7,9,6,9,5] //{j,i,j,i,j,i...}
for(var i = 0; i < startPoints.length;i+=2)
{
    document.getElementById(startPoints[i]+"/"+startPoints[i+1]).innerHTML = lives;
}

function step1()
{
    for(var j = 1; j < N; j++)
    {
        for(var i = 1; i < M; i++)
        {
            var c = 0;
            var friends = 
            [
            document.getElementById((j+1)+"/"+i).innerHTML, 
            document.getElementById((j-1)+"/"+i).innerHTML, 
            document.getElementById(j+"/"+(i+1)).innerHTML, 
            document.getElementById(j+"/"+(i-1)).innerHTML, 
            document.getElementById((j-1)+"/"+(i+1)).innerHTML, 
            document.getElementById((j+1)+"/"+(i+1)).innerHTML, 
            document.getElementById((j+1)+"/"+(i-1)).innerHTML, 
            document.getElementById((j-1)+"/"+(i-1)).innerHTML
            ];         
            for(var z = 0; z < friends.length; z++)
            {
                if(friends[z] == lives)
                {
                 c++;
                }
            }
            var value = document.getElementById(j+"/"+i).innerHTML;
            if(c == 3 && value == "")
            {
                life.push(j, i);                
            }
            if(c > 3 && value == lives || c < 2 && value == lives)
            {
                dead.push(j, i);                
            }    
        }
    }
    for(var l = 0; l < life.length; l+=2)
    {
        document.getElementById(life[l]+"/"+life[l+1]).innerHTML = respawn;
    }
    for(var d = 0; d < dead.length; d+=2)
    {
        document.getElementById(dead[d]+"/"+dead[d+1]).innerHTML = mustDie;
    }
    life = [];
    dead = [];
}

function step2()
{
    for(var a = 1; a < N; a++)
    {
        for(var b = 1; b < M; b++)
        {
            value = document.getElementById(a+"/"+b).innerHTML;
            if(value == mustDie)
            {
                document.getElementById(a+"/"+b).innerHTML = "";
            }
            if(value == respawn)
            {
                document.getElementById(a+"/"+b).innerHTML = lives;
            }
        }
    }
}



var timer = setTimeout(function(){}, 2000);
clearTimeout(timer);

var start = document.getElementById('start');
start.addEventListener('click', function()
{
    if(swapStart == 0)
    {    

        clearTimeout(timer); 
        checkAnimation(); 
        setTimeout(function run()
        {
            step2();
            step1();
            setTimeout(step2, 1000);
            timer = setTimeout(run, 2000);
        }, 100);
        swapStart = 1;
        start.setAttribute('class', 'swapStop');
    }
    else
    {
        clearTimeout(timer);
        checkSpeed(); 
        swapStart = 0;
        start.setAttribute('class', 'swapStart');
    }
});

var step = document.getElementById('step');
step.addEventListener('click', function()
{
    clearTimeout(timer);
    checkSwapStartForStop();
    checkSpeed();    
    if(swapForAnimation == 0 && count == 0)
    {
        step2();
        step1();
        step2();
    }
    else if(swapForAnimation == 0 && count == 1)
    {        
        respawn = '<img src="ico/respawn.png">'
        mustDie = '<img src="ico/cross.png">';
        step2();
        respawn = '<em></em>';
        mustDie = '<span></span>';
        count = 0;
    }
    else if(count == 0)
    {
        step2();
        step1();
        count ++;
    }
    else 
    {
        step2();
        count = 0;
    }
});

var x1 = document.getElementById('x1');
x1.addEventListener('click', function()
{   
    clearTimeout(timer);
    checkSpeed();
    checkSwapStartForRun(); 
    checkAnimation(); 
    var image = '<img src="https://img.icons8.com/ios-filled/30/000000/fast-forward.png">';
    x1.innerHTML = image;
    swapForSpeed1 = 1;
    setTimeout(function run()
    {
        step2();
        step1();
        setTimeout(step2, 500);
        timer = setTimeout(run, 1000);
    }, 1000);
});

var x2 = document.getElementById('x2');
x2.addEventListener('click', function()
{
    clearTimeout(timer);
    checkSpeed();
    checkSwapStartForRun();
    checkAnimation();  
    var image = '<img src="https://img.icons8.com/ios-filled/30/000000/fast-forward.png">';
    x2.innerHTML = image + image;
    swapForSpeed2 = 1;
    setTimeout(function run()
    {
        step2();
        step1();
        setTimeout(step2, 300);
        timer = setTimeout(run, 600);
    }, 1000);
});

var x3 = document.getElementById('x3');
x3.addEventListener('click', function()
{
    clearTimeout(timer); 
    checkSpeed();
    checkSwapStartForRun(); 
    checkAnimation(); 
    var image = '<img src="https://img.icons8.com/ios-filled/30/000000/fast-forward.png">';
    x3.innerHTML = image + image + image;
    swapForSpeed3 = 1;
    setTimeout(function run()
    {
        step2();
        step1();
        setTimeout(step2, 125);
        timer = setTimeout(run, 250);
    }, 1000);
});

var animation = document.getElementById('animation');
animation.addEventListener('click', function()
{
    clearTimeout(timer) 
    checkSpeed();
    checkSwapStartForStop();
    setTimeout(function()
    {
        if(swapForAnimation == 1)
        {
            respawn = '<em></em>';
            mustDie = '<span></span>';
            document.getElementById('animation').innerHTML = '<span>ANIMATION</span><img src="https://img.icons8.com/ios-glyphs/30/000000/toggle-off.png">';
            swapForAnimation = 0;
        }
        else
        {
        respawn = '<img src="ico/respawn.png">';
        mustDie = '<img src="ico/cross.png">';
        document.getElementById('animation').innerHTML = '<span>ANIMATION</span><img src="https://img.icons8.com/ios-glyphs/30/000000/toggle-on.png">';
        swapForAnimation = 1;
        }
    }, 200);
});

var clear = document.getElementById('clear');
clear.addEventListener('click', function()
{
    clearTimeout(timer);
    checkSwapStartForStop();
    checkSpeed(); 
    for(var j = 0; j <= N; j++)
    {
        for(var i = 0; i <= M; i++)
        {
        document.getElementById(j+"/"+i).innerHTML = "";
        }
    }
});

function checkSwapStartForRun()
{
    if(swapStart == 0)
    {    
        clearTimeout(timer);
        swapStart = 1;
        start.setAttribute('class', 'swapStop');
    }
}

function checkSwapStartForStop()
{
    if(swapStart == 1)
    {
        clearTimeout(timer);
        swapStart = 0;
        start.setAttribute('class', 'swapStart');
    }
}
function checkAnimation()
{
    if(swapForAnimation == 0)
    {
        for(var a = 1; a < N; a++)
        {
            for(var b = 1; b < M; b++)
            {
                value = document.getElementById(a+"/"+b).innerHTML;
                if(value == '<img src="ico/cross.png">')
                {
                    document.getElementById(a+"/"+b).innerHTML = '';
                }
                if(value == '<img src="ico/respawn.png">')
                {
                    document.getElementById(a+"/"+b).innerHTML = lives;
                }
            }
        }
    }
}

function checkSpeed()
{
    var image2 = '<img src="https://img.icons8.com/windows/30/000000/fast-forward.png">'
    if(swapForSpeed1 = 1)
    {
        x1.innerHTML = image2;
        swapForSpeed1 = 0;
    }
    if(swapForSpeed2 = 1)
    {
        x2.innerHTML = image2 + image2;
        swapForSpeed2 = 0;
    }
    if(swapForSpeed3 = 1)
    {
        x3.innerHTML = image2 + image2 + image2;
        swapForSpeed3 = 0;
    }
}