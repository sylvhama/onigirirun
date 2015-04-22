var endState = {

	create: function() { 
		//Functions
		setButton = function(button) {
			button.input.useHandCursor = true;
			button.anchor.setTo(0.5, 0.5);
		}
		
		setText = function(x, y, text, style) {
			var text = game.add.text(x , y, text, style);
			text.anchor.setTo(0.5, 0.5);
			return text;
		}
		
		//Score
		if (!localStorage.getItem('bestScore')) {
			localStorage.setItem('bestScore', game.global.score);
		}	

		var score = 'Score: ' + game.global.score;
		var scoreLabel = setText(game.world.centerX, 60, score, { font: '20px Comfortaa', fill: '#ffffff'});
		
		var bestLabel;		
		if (game.global.score > localStorage.getItem('bestScore')) {
			localStorage.setItem('bestScore', game.global.score);	
			var best = 'Best score: ' + localStorage.getItem('bestScore') + ' NEW RECORD';
			var bestLabel = setText(game.world.centerX, 90, best, { font: '20px Comfortaa', fill: '#e74c3c'});
			game.add.tween(bestLabel.scale).to({x: 1, y: 1}, 400).to({x: 1.2, y: 1.2}, 400).loop().start();
		} else {
			var best = 'Best score: ' + localStorage.getItem('bestScore');
			var bestLabel = setText(game.world.centerX, 90, best, { font: '20px Comfortaa', fill: '#ffffff'});
		}
		
		// Share
		var fb = game.add.button(game.world.centerX-80, game.world.centerY, 'facebook', this.shareFacebook, this);
		setButton(fb);
		var tw = game.add.button(game.world.centerX, game.world.centerY, 'twitter', this.shareTwitter, this);
		setButton(tw);
		var gp = game.add.button(game.world.centerX+80, game.world.centerY, 'google', this.shareGoogle, this);
		setButton(gp);
		game.add.tween(fb).to({angle: -5}, 400).to({angle:5}, 400).loop().start();
		game.add.tween(tw).to({angle: -5}, 400).to({angle:5}, 400).loop().start();
		game.add.tween(gp).to({angle: -5}, 400).to({angle:5}, 400).loop().start();

		// Replay button
		var replayText = 'Press space bar to replay';
		if (!game.device.desktop) {
			replayText = 'Play again';
		}else {
			var spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
			spaceBar.onDown.addOnce(this.start, this);
		}
		var startLabel = setText(game.world.centerX, game.world.height-60, replayText, { font: '30px Comfortaa', fill: '#ffffff' });
		game.add.tween(startLabel).to({angle: -5}, 400).to({angle:5}, 400).loop().start(); 
		startLabel.inputEnabled = true;
		startLabel.input.useHandCursor = true;
		startLabel.events.onInputDown.add(this.start, this);
				
		// Mute button
		this.muteButton = game.add.button(game.world.width-40, 10, 'mute', this.toggleSound, this);
		this.muteButton.input.useHandCursor = true;
		if (game.sound.mute) {
			this.muteButton.frame = 1;
		}
	},

	toggleSound: function() {
		game.sound.mute = ! game.sound.mute;
		this.muteButton.frame = game.sound.mute ? 1 : 0;	
	},

	start: function() {
		game.state.start('play');	
	},
	
	shareFacebook: function() {
		window.open('https://www.facebook.com/sharer/sharer.php?u=http://shamann.fr/onigirirun/', '_blank');	
	},
	shareTwitter: function() {
		window.open('http://twitter.com/share?text=I+just+scored+'+game.global.score+'+on+%23OnigiriRun&url=http://shamann.fr/onigirirun/&via=sylvhama', '_blank');
	},
	shareGoogle: function() {
		window.open('https://plus.google.com/share?url=http://shamann.fr/onigirirun/', '_blank');
	}
};