import Main from "./states/Main";

class Game extends Phaser.Game {
  constructor(width, height, engine, domNode) {
    super(width, height, engine, domNode);

    this.state.add("Main", Main, false);
  }

  start() {
    this.state.start("Main");
  }
}

const game = new Game(1140, 400, Phaser.AUTO, "game");

game.start();
