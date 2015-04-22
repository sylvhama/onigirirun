var playState = {
		
	create: function() { 	
	
		// Background
		var backgroundbmd = game.add.bitmapData(100, 320);
        backgroundbmd.ctx.rect(0, 0, 50, 320);
        backgroundbmd.ctx.fillStyle = "#f1c40f";
        backgroundbmd.ctx.fill();
        backgroundbmd.ctx.beginPath();
        backgroundbmd.ctx.rect(50, 0, 50, 320);
        backgroundbmd.ctx.fillStyle = "#e67e22";
        backgroundbmd.ctx.fill();		
		this.background = game.add.tileSprite(0, 0, game.width, game.height, backgroundbmd);

		// Player
		this.player = game.add.sprite(game.world.centerX, game.world.centerY, 'oni');
		game.physics.arcade.enable(this.player); 
		this.player.anchor.setTo(0.5, 0.5);
		this.player.body.gravity.y = 700;
		
		// Score
		game.global.score = 0;
		this.scoreLabel = game.add.text(20, 10, 'Score: 0', { font: '18px Comfortaa', fill: '#ffffff'});
		
		// Ground
		var groundbmd = game.add.bitmapData(50, 50);
        groundbmd.ctx.rect(0, 0, 50, 50);
        groundbmd.ctx.fillStyle = "#ecf0f1";
        groundbmd.ctx.fill();
        groundbmd.ctx.beginPath();
        groundbmd.ctx.rect(0, 0, 25, 25);
        groundbmd.ctx.rect(25, 25, 25, 25);
        groundbmd.ctx.fillStyle = "#bdc3c7";
        groundbmd.ctx.fill();		
		this.ground = game.add.tileSprite(0, game.height - 50, game.width, 50, groundbmd);
		game.physics.arcade.enable(this.ground);
		this.ground.body.immovable = true;	
		
		//Enemies				
		this.makis = game.add.group();		
		this.sushis = game.add.group();		
		this.sashimis = game.add.group();
		this.makis.enableBody = true;
		this.sushis.enableBody = true;
		this.sashimis.enableBody = true;
		this.makis.createMultiple(10, 'maki');
		this.sushis.createMultiple(10, 'sushi');
		this.sashimis.createMultiple(10, 'sashimi');
		this.nextEnemy = 0;
		this.speedUp = false;
		
		// Explosion
		this.emitter = game.add.emitter(0, 0, 15);
		this.emitter.makeParticles('pixel');
		this.emitter.setYSpeed(-150, 150);
		this.emitter.setXSpeed(-150, 150);
		this.emitter.gravity = 0;
		
		// Sounds
		this.jumpSound = game.add.audio('jump');
		this.coinSound = game.add.audio('coin');
		this.deadSound = game.add.audio('dead');
		
	},

	update: function() {		
		game.physics.arcade.overlap(this.player, this.makis, this.playerDie, null, this);
		game.physics.arcade.overlap(this.player, this.sushis, this.playerDie, null, this);
		game.physics.arcade.overlap(this.player, this.sashimis, this.playerDie, null, this);
		game.physics.arcade.collide(this.player, this.ground);
		game.physics.arcade.collide(this.makis, this.ground);
		game.physics.arcade.collide(this.sushis, this.ground);
		game.physics.arcade.collide(this.sashimis, this.ground);
		if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			this.jump();
		}
		if(game.input.pointer1.isDown) {
			this.jump();
		}
		if(game.global.score < 1000) {
			this.ground.tilePosition.x = this.ground.tilePosition.x-3.3;
			this.background.tilePosition.x = this.background.tilePosition.x-1;
		} else {
			this.ground.tilePosition.x = this.ground.tilePosition.x-5.5;
			this.background.tilePosition.x = this.background.tilePosition.x-1.66;
		}
		
		if (this.nextEnemy < game.time.now) {
			var delay = 2000;			
			if(game.global.score > 2000) delay = 1000;
			if(game.global.score > 5000) delay = 900;
			
			var r = Math.floor(Math.random() * 3) + 1;
			switch(r) {
				case 1:
					this.addEnemy(this.makis, 100);
					break;
				case 2:
					this.addEnemy(this.sushis, 200);
					break;
				case 3:
					this.addEnemy(this.sashimis, 300);
					break;
			}					
			this.nextEnemy = game.time.now + delay;
		}
	},
	
	jump: function() {
		if (this.player.body.velocity.y == 0) {
			this.player.body.velocity.y = -310;
			game.add.tween(this.player).to({angle:360}, 400, Phaser.Easing.Quadratic.InOut).start();
			this.jumpSound.play();
		}
	},
	
	playerDie: function() {
		if (!this.player.alive) {
			return;
		}
		this.player.kill();
		this.deadSound.play();
		this.emitter.x = this.player.x;
		this.emitter.y = this.player.y;
		this.emitter.start(true, 600, null, 15);
		game.time.events.add(1000, this.end, this);
	},
	
	end: function() {
		game.state.start('end');
	},
	
	addEnemy: function(group, value) {	
		var enemy = group.getFirstDead();		
		if (!enemy) {
			return;
		}
		enemy.anchor.setTo(0.5, 1);
		enemy.reset(game.world.width, game.world.height-50);
		if(game.global.score < 1000) {
			enemy.body.velocity.x = -200;
		}else {
			enemy.body.velocity.x = -330;
		}
		enemy.checkWorldBounds = true;
		enemy.outOfBoundsKill = true;
		enemy.events.onKilled.add(function() { this.scored(value); enemy.events.onKilled.removeAll();}, this)
	},
	
	scored: function(value) {
		if (!this.player.alive) {
			return;
		}
		game.global.score = game.global.score + value;
		this.coinSound.play();
		this.scoreLabel.text = 'Score: ' + game.global.score;
		game.add.tween(this.scoreLabel.scale).to({x: 1.2, y: 1.2}, 400).to({x: 1, y: 1}, 400).start();
		
		if(!this.speedUp && game.global.score >= 1000) {
			this.speedUp = true;
			this.makis.forEachAlive(function(child) { child.body.velocity.x = -330; }, this);
			this.sushis.forEachAlive(function(child) { child.body.velocity.x = -330; }, this);
			this.sashimis.forEachAlive(function(child) { child.body.velocity.x = -330; }, this);
		}
	}
};