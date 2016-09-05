//Initalize phaser
//var game = new Phaser.Game(500, 340, Phaser.AUTO, 'gameDiv');
//for mobile

var game = new Phaser.Game(1140,400,Phaser.Auto);

//Define our global variable

game.global = {
    score: 0
};

//add all the states

game.state.add('boot', boot);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('play2', play2State);


//Start bootstate

game.state.start('boot');


