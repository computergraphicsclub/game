var game = new Phaser.Game(1140, 400, Phaser.AUTO, "game");
var mainState = require("./mainState");

game.state.add("mainState", mainState);

game.state.start("mainState");
