var vert = 83;
var horz = 100; 

var Counter = function() { this.ii = 0; };
Counter.prototype.inc = function(){this.ii++;};

var enemySprites = ['images/enemy-bug-left.png', 'images/enemy-bug.png'];

// Enemies our player must avoid
var Enemy = function() {
	this.x = 0;
	this.y = 90;
	this.dir = 1; // for right, or -1 for left
	this.speed = 250;
    this.sprite = enemySprites[1];
};
Enemy.prototype.update = function(dt) {
	if (this.x > 500 || this.x < -80) { 
		this.dir = this.dir * -1;
		this.speed = Math.floor(Math.random() * 10) * 20;
	    if (this.dir == -1) {
			this.sprite = enemySprites[0];
		} else { 
			this.sprite = enemySprites[1];
		}
	};
	this.x = this.x + dt * this.dir * this.speed;
};
Enemy.prototype.render = function() {
	var rr = Resources.get(this.sprite);
    ctx.drawImage(rr, this.x, this.y);
};
Enemy.prototype.checkCollision = function (px, py) {
	//noop
};

var Player = function() {
	this.sprite = 'images/char-boy.png';
	this.x = 202;
	this.y = 405;
};
Player.prototype.update = function() { 
/* I'm not sure what this was intended for exactly, but I use it here
to check if player has stepped off the playing field */
	if (this.y < 0) { 
		this.x = 202; 
		this.y = 405;
	};
	if (this.x < 0) { this.x = this.x + horz; };
	if (this.x > 500) { this.x = this.x - horz; };
	//console.log(this.x + ", " + this.y)
}
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(keyCode) {
	if (keyCode === 'left') { 
		this.x = this.x - horz; 
		console.log("left"); 
	};
	if (keyCode === 'up') { 
		this.y = this.y - vert; 
		console.log("up"); 
	};
	if (keyCode === 'right') { 
		this.x = this.x + horz; 
		console.log("right"); 
	};
	if (keyCode === 'down') { 
		this.y = this.y + vert; 
		console.log("down"); 
	};
	//console.log("unknown key press " + keyCode);
};

// Now instantiate your objects.
var allEnemies = [];
for (var ii=0; ii<3; ii++) { allEnemies.push(new Enemy()); };
allEnemies[0].y = 230;
allEnemies[1].y = 145;
allEnemies[1].dir = -1;
allEnemies[1].x = 500;
allEnemies[1].sprite = enemySprites[1];
allEnemies[2].y = 65;

var player = new Player();

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
