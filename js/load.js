var loadState = {

	preload: function () {		
		// Add a loading label 
		var loadingLabel = game.add.text(game.world.centerX, 150, 'Loading...', { font: '30px Comfortaa', fill: '#ffffff' });
		loadingLabel.anchor.setTo(0.5, 0.5);

		// Add a progress bar
		var progressBar = game.add.sprite(game.world.centerX, 200, 'progressBar');
		progressBar.anchor.setTo(0.5, 0.5);
		game.load.setPreloadSprite(progressBar);

		// Load all assets
		game.load.spritesheet('mute', 'assets/muteButton.png', 28, 22);
		game.load.image('oni', 'assets/oni.png');
		game.load.image('pixel', 'assets/pixel.png');
		game.load.image('maki', 'assets/maki.png');
		game.load.image('sushi', 'assets/sushi.png');
		game.load.image('sashimi', 'assets/sashimi.png');
		game.load.image('facebook', 'assets/facebook.png');
		game.load.image('twitter', 'assets/twitter.png');
		game.load.image('google', 'assets/google.png');
		game.load.audio('jump', ['assets/jump.wav', 'assets/jump.mp3']);
		game.load.audio('coin', ['assets/coin.wav', 'assets/coin.mp3']);
		game.load.audio('dead', ['assets/explosion.wav', 'assets/explosion.mp3']);
		
	},

	create: function() { 
		game.state.start('menu');
	}
};