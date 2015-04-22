// Initialize Phaser
var game = new Phaser.Game(640, 320, Phaser.AUTO, 'gameDiv');

// Our 'global' variable
game.global = {
	score: 0,
	// Add other global variables
};

// Define states
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('end', endState);

// Start the "boot" state
game.state.start('boot');