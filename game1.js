var canvas = document.getElementById("canvas");
document.body.style.cursor = "none";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ghost = [];
bullet = [];
heart = [];
var timer = 0;
var timerb = 0;
function spawnheart() {
	heart.push({
		x: -15, 
		y: 10,
		sizeX: 28,
		sizeY: 28,
	})
}

function spawnghost() {
	ghost.push({
	x:canvas.width+100,
	y:1*(Math.random() * (canvas.height-100 - (0)) + (0)),
	sizeX:80,
	sizeY:80,
	dx: 1*(Math.random() * (-5 - (-7)) + (-7)),		
	dy:1*(Math.random() * (2 - (-4)) + (-4)),
	dead: 0,
});
}
function spawnbullet(){
	bullet.push({
	x:game.hero.x+40,
	y:game.hero.y+50,
	sizeX:20,
	sizeY:20,
	dx:10,
	dy:2,
	dead: 0,
});
}

var refresh = {
	response: 0,
	sizeX: 250,
	sizeY: 250,
	x: canvas.height/2+250,
	y: canvas.height/2-100 ,
}

var game = {
	hero: undefined,
	ghost: undefined,
	sprites: {
	background: undefined,
	hero: undefined,
	ghost: undefined,
	bullet: undefined,
	heart: undefined,
	refresh: undefined,
	},

	init: function() {
		
		this.ctx = canvas.getContext("2d");
		canvas.addEventListener("mousemove", function(event){
			game.hero.x = event.offsetX-25;
			game.hero.y = event.offsetY-13;
});
		this.ctx.font = "30px Verdana";
		this.ctx.fillStyle = "white";

	},
	load: function(){
		for(var key in this.sprites){
			this.sprites[key] = new Image();
			this.sprites[key].src = "sprites/" + key + ".png";
		
	}},
	start: function() {
		this.init();
		this.load();
		this.run();
	},
	render: function(){
		this.ctx.clearRect(0, 0, canvas.width, canvas.height);
		this.ctx.drawImage(this.sprites.background, 0, 0, canvas.width, canvas.height);
		this.ctx.drawImage(this.sprites.hero, game.hero.x, game.hero.y, game.hero.sizeX, game.hero.sizeY);
			for (i in bullet) {this.ctx.drawImage(this.sprites.bullet, bullet[i].x, bullet[i].y, bullet[i].sizeX, bullet[i].sizeY);
		}
		for (i in ghost) {this.ctx.drawImage(this.sprites.ghost, ghost[i].x, ghost[i].y, ghost[i].sizeX, ghost[i].sizeY);
		
		}
		for ( i in heart) {this.ctx.drawImage(this.sprites.heart, heart[i].x, heart[i].y, heart[i].sizeX, heart[i].sizeY)}
		this.ctx.fillText("Score: " + timerb, 20, canvas.height-20);
		if (game.hero.heart <=0){
				
				this.ctx.drawImage(this.sprites.refresh, refresh.x, refresh.y, refresh.sizeX, refresh.sizeY);
				 alert ("Game over!!!\nRepeat?&?")
				 score = 0;
				 timer = 0;
				 timerb = 0;
				 while(0<ghost.length){
				ghost.shift();
				}
				 while(0<bullet.length){
				bullet.shift();
				}
				game.hero.heart = 3;
			}
		
	
},
	run: function(){
		this.render();
		
		while(game.hero.heart<heart.length){
			heart.shift();
		}
		for (var  i = game.hero.heart; i>0; i--){
			if (game.hero.heart == heart.length) continue;
			spawnheart();

			for (var i =0; i<heart.length; i++){
				heart[i].x +=25;	
				
			}	
		}		

			for	(j in ghost){
			
			if((game.hero.x + game.hero.sizeX - 20 >= ghost[j].x && game.hero.x <= ghost[j].x+70 ) && (ghost[j].y <= game.hero.y+game.hero.sizeY-20 && ghost[j].y+80 >= game.hero.y )){
				game.hero.heart -=1;
				ghost[j].dead = 1;
				if (ghost[j].dead == 1)
				ghost.splice(j,1);
				timerb += 1000;
			}

		}
		for (i in bullet) {
			bullet[i].x += bullet[i].dx;
			
			
		for	(j in ghost){
			if((bullet[i].x >= ghost[j].x+40 && bullet[i].x <= ghost[j].x+80 ) && (ghost[j].y-20 <= bullet[i].y && ghost[j].y+80 >= bullet[i].y )) {
				bullet[i].dead = 1;
				ghost[j].dead = 1;
			}
			
		}
		if((bullet[i].x >= canvas.width) || bullet[i].dead == 1) {
			bullet.splice(i,1);
			continue;
		}
		}
		for (i in ghost) {
			ghost[i].x += ghost[i].dx;
			ghost[i].y += ghost[i].dy
			if (ghost[i].y<=0 || ghost[i].y+80>canvas.height) ghost[i].dy = -ghost[i].dy;
			if (ghost[i].dead == 1){
				ghost.splice(i,1);
				timerb += 1000;
				continue;
			}
			if(ghost[i].x <= 0 ) {
			ghost.splice(i,1);
			
		}}
		timer++;
		timerb++;
		if(timer%30==0 && timer < 1500) {spawnghost();}
		if(timer%10==0 && timer < 2500 && timer > 1500) {spawnghost();}
		if(timer%5==0&& timer > 2500) {spawnghost();}
		if(timer%60==0 && timer < 1500) {spawnbullet();}
		if(timer%30==0 && timer < 2500 && timer > 1500) {spawnbullet();}
		if(timer%10==0  && timer > 2500) {spawnbullet();}
		window.requestAnimationFrame(function(){
			game.run();
		})
	}, 
};
game.hero = {
	x:0,
	y:window.innerHeight/2,
	sizeX: 100,
	sizeY: 100,
	heart: 3,
	spawn: function () {

	}
};

window.addEventListener("load",function(){
	game.start();
});