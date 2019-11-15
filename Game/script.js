function Artifact(n, h, a, d, minD, maxD, s)
{
	this.name = n;
	this.health = h;
	this.attack = a;
	this.defense = d;
	this.minDmg = minD;
	this.maxDmg = maxD;
	this.speed = s;
}
var boots = new Artifact('bootsOfSpeed', 20, 0, 5, 0, 0, 10);
var sphere = new Artifact('sphereOfLife', 100, 0, 0, 0, 0, 0);
var hammer = new Artifact('mithrilHammer', 0, 10, 0, 5, 5, 0);
var armor = new Artifact('heavyArmor', 50, 0, 20, 0, 0, -2);

function stat(art, elem)
{
	var value = 0;
	for(var i = 0; i < art.length; i++)
	{
		value += art[i][elem];
	}
	return value;
}

function Creature(art, n, h, a, d, minD, maxD, s)
{
	this.artifact = art;
	this.name = n;
	this.health = h + stat(this.artifact, 'health');
	this.attack = a + stat(this.artifact, 'attack');
	this.defense = d + stat(this.artifact, 'defense');
	this.minDmg = minD + stat(this.artifact, 'minDmg');
	this.maxDmg = maxD + stat(this.artifact, 'maxDmg');
	this.speed = s + stat(this.artifact, 'speed');
	this.fullHP = h + stat(this.artifact, 'health');
}

var knight = new Creature([armor, sphere], 'knight', 100, 80, 0, 10, 50, 8);
var skeleton = new Creature([hammer], 'skeleton', 150, 50, 10, 5, 20, 10);
var crusader = new Creature([boots], 'crusader', 500, 30, 50, 5, 10, 1);
var griffon = new Creature([], 'griffon', 250, 80, 30, 15, 20, 9);

function changeHPonDisplay(elem, h, f)
{
	var el = document.getElementById(elem+'HP');
	el.style['width'] = Math.trunc((h / f) * 100)+'px';
}

Creature.prototype.hit = function(enemy)
{
	var randomDmg = this.minDmg + (this.maxDmg - this.minDmg) * Math.random();
	var finalDmg = randomDmg + randomDmg * 0.01 * this.attack;
	var damage = (finalDmg - finalDmg * 0.01 * enemy.defense).toFixed(1);
	enemy.health -= damage;
	changeHPonDisplay(enemy.name, enemy.health, enemy.fullHP);
	return damage;
}
Creature.prototype.checkHP = function()
{
	if(this.health > 0){return true;}
	else{return false;}
}

var teamA = [skeleton, knight];
var teamB = [griffon, crusader];
var allCreature = [skeleton, knight, griffon, crusader];

allCreature.sort(function(a, b)
{
	return b.speed - a.speed;
});

var enemy = [];


function sendMessageAboutDeath(name)
{
	obj = document.getElementById(name);
	str = '<span class="mes dead">' + name +' погибает</span>';
	infoBox.innerHTML = str + infoBox.innerHTML;
	obj.style['display'] = 'none';
}
function sendMessageAboutFight(x, y, d, color)
{
	str = '<span class="mes"><span class="'+color+'">'+x+'</span> атакует <span class="'+color+'">'+y+'</span> на <span class="'+color+'">'+d+'</span> урона</span>';
	infoBox.innerHTML = str + infoBox.innerHTML;
}

function checkCountUnitInTeam(team)
{
	var count = 0;
	team.forEach(function(elem)
	{
		if(elem.checkHP()){count++}
	});
	return count;
}

var t1 = checkCountUnitInTeam(teamA);
var t2 = checkCountUnitInTeam(teamB);
var i = 0;
var infoBox = document.getElementById('infoBox');
var str = '';
var obj;
function go()
{
	if(allCreature[i].checkHP())
	{
		if(teamA.indexOf(allCreature[i]) != -1)
		{
			enemy = teamB;
		}
		else
		{
			enemy = teamA;
		}
	}
	else
	{
		i++;
		if(i == allCreature.length){i = 0;}
		return;
	}
	var flag = false;
	while(!flag)
	{
		var rand = Math.ceil(enemy.length*Math.random()) - 1;
		var randomEnemy = enemy[rand];
		if(randomEnemy.checkHP()){flag = true;}
	}

	var dmg = allCreature[i].hit(randomEnemy);
	sendMessageAboutFight(allCreature[i].name, randomEnemy.name, dmg, 'red');

	setTimeout(function()
	{
		if(randomEnemy.checkHP())
		{
			var reflectDmg = randomEnemy.hit(allCreature[i])
			sendMessageAboutFight(randomEnemy.name, allCreature[i].name, reflectDmg, 'green');

			if(!allCreature[i].checkHP())
			{
				sendMessageAboutDeath(allCreature[i].name);
			}
		}
		else
		{
			sendMessageAboutDeath(randomEnemy.name);
		}
		t1 = checkCountUnitInTeam(teamA);
		t2 = checkCountUnitInTeam(teamB);
		if(t1 == 0)
		{
			clearInterval(interval);
			str = '<p class="win">Команда 2 победила!</p>';
			infoBox.innerHTML = str + infoBox.innerHTML;
		}
		else if(t2 == 0)
		{
			clearInterval(interval);
			str = '<p class="win">Команда 1 победила!</p>';
			infoBox.innerHTML = str + infoBox.innerHTML;
		}
		i++;
		if(i == allCreature.length){i = 0;}
	}, 2000);
}

var interval = setInterval(go, 4000);

var audio = document.getElementById("audio");
var audioBut = document.getElementById("audioBut");

audioBut.addEventListener('click', function()
{
	audioBut.classList.toggle('active');
	if(audio.paused)
	{
		audio.play();
		audio.volume = 0.3;
	}
	else
	{
		audio.pause();
	}
});