var Engine = (function(global) {
    var doc = global.document;
	var win = global.window;
	var canvas = doc.createElement('canvas');
	var ctx = canvas.getContext('2d');
	var patterns = {};
	var lastTime = Date.now();
    
	canvas.width = 505;
    canvas.height = 616;
    doc.body.appendChild(canvas);
    
	function main() {
        var now = Date.now();
		var dt = (now - lastTime) / 1000.0;
        update(dt);
        render();
        lastTime = now;
        win.requestAnimationFrame(main);
    };
    function init() {
        reset();
        lastTime = Date.now();
        main();
    }
    function update(dt) {
        updateEntities(dt);
        checkCollisions();
    }
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
    }
	function checkCollisions() {
		allEnemies.forEach(function(enemy) {
			enemy.checkCollision(player.x, player.y);
		});
	}
    function render() {
        var rowImages = [
                'images/water-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/grass-block.png',
                'images/grass-block.png'
            ],
            numRows = 6,
            numCols = 5,
            row, col;

        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        renderEntities();
    }

    function renderEntities() {
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });
        player.render();
    }

    function reset() {
        // noop
    }

    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
		'images/enemy-bug-left.png',
        'images/char-boy.png'
    ]);
    Resources.onReady(init);

    global.ctx = ctx;
})(this);
