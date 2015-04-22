var bootState = {

	preload: function () {
		game.load.image('progressBar', 'assets/progressBar.png');
	},

	create: function() { 
		// Set a background color and the physic system
		game.stage.backgroundColor = '#f1c40f';
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.minWidth = 320;
		game.scale.minHeight = 160;
		game.scale.maxWidth = 640;
		game.scale.maxHeight = 320;
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;		
		game.scale.setScreenSize(true);

		game.state.start('load');
	}
};