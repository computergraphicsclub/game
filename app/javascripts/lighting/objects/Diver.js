class Diver extends Phaser.Sprite {
  constructor({ game, x, y, asset}) {
    super(game, x, y, asset);
    this.speed = 3;

    // Add this diver into the stage
    this.game.stage.addChild(this);
  }

  update() {
    this.move();
  }

  move() {
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) 
      this.x -= this.speed;
    else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
      this.x += this.speed;
    else if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP))
      this.y += this.speed;
    else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
      this.y -= this.speed;
  }
}

export default Diver;
