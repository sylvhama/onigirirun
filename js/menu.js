var menuState = {

	create: function() { 
		//Functions
		setSprite = function(x ,y , name) {
			var sprite = game.add.sprite(x, y, name);
			sprite.anchor.setTo(0.5, 0.5);
			return sprite;
		}
		
		setText = function(x, y, text, style) {
			var text = game.add.text(x , y, text, style);
			text.anchor.setTo(0.5, 0.5);
			return text;
		}
		
		//Score
		if (!localStorage.getItem('bestScore')) {
			localStorage.setItem('bestScore', 0);
		}		
		var score = 'Best score: ' + localStorage.getItem('bestScore');
		var scoreLabel = game.add.text(20, 10, score, { font: '18px Comfortaa', fill: '#ffffff'});
		
		//Manual
		var manual = '';
		if (game.device.desktop) {
			manual = manual + 'Press space bar\nto jump';
		} else{
			manual = manual + 'Touch to jump';
		}
		var manualLabel = setText(game.world.width-100, game.world.centerY, manual, { font: '16px Comfortaa', fill: '#ffffff',  align: 'center'});
		game.add.tween(manualLabel).to({ y: game.world.centerY-30 }, 800, Phaser.Easing.Quadratic.InOut).to({ y: game.world.centerY+30 }, 800, Phaser.Easing.Quadratic.InOut).loop().start();
	
		// Name of the game
		var nameLabel = setText(game.world.centerX, 60, 'Onigiri Run', { font: '50px Comfortaa', fill: '#ffffff' });
		
		// Game logo		
		logo = game.add.button(game.world.centerX, game.world.centerY, 'oni', this.start, this);
		logo.anchor.setTo(0.5, 0.5);
		logo.input.useHandCursor = true;
		game.add.tween(logo).to({angle: -5}, 400).to({angle:5}, 400).loop().start();

		// Start button
		var startText = 'Press space bar to start';
		if (!game.device.desktop) {
			startText = 'Touch to start';
		}else {
			var spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
			spaceBar.onDown.addOnce(this.start, this);
		}
		var startLabel = setText(game.world.centerX, game.world.height-60, startText, { font: '30px Comfortaa', fill: '#ffffff' });
		game.add.tween(startLabel).to({angle: -5}, 400).to({angle:5}, 400).loop().start(); 
		startLabel.inputEnabled = true;
		startLabel.input.useHandCursor = true;
		startLabel.events.onInputDown.add(this.start, this);				
		
		//Explanations
		var maki = setSprite(40, game.world.centerY-35, 'maki');
		game.add.tween(maki.scale).to({x: 0.9, y: 0.9}, 400).to({x: 1, y: 1}, 400).loop().start();
		var sushi = setSprite(40, game.world.centerY, 'sushi');
		game.add.tween(sushi.scale).to({x: 0.9, y: 0.9}, 400).to({x: 1, y: 1}, 400).loop().start();
		var sashimi = setSprite(40, game.world.centerY+45, 'sashimi');
		game.add.tween(sashimi.scale).to({x: 0.9, y: 0.9}, 400).to({x: 1, y: 1}, 400).loop().start();

		var makiText = setText(100, game.world.centerY-35, '= 100¥ ', { font: '20px Comfortaa', fill: '#ffffff' });
		var sushiText = setText(100, game.world.centerY, '= 200¥', { font: '20px Comfortaa', fill: '#ffffff' });
		var sashimiText = setText(100, game.world.centerY+45, '= 300¥', { font: '20px Comfortaa', fill: '#ffffff' });

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
	}
};