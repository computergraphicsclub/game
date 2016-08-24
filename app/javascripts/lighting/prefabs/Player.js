class Player extends Phaser.Sprite {
   constructor({ game, x, y, key }) {
    super(game, x, y, key);

    this.setupBasics();
    this.setupAnimations();
    this.game.add.existing(this);
  }

  setupBasics() {
    this.anchor.setTo(0.5, 0.5);

    this.game.physics.arcade.enable(this);
    this.body.gravity.y = 500;
  }

  setupAnimations() {
    this.animations.add("moveRight", [1, 2], 8, true);
    this.animations.add("moveLeft", [3, 4], 8, true);
  }

  move(controls) {
    if (controls.cursors.left.isDown)
      this.moveLeft();
    else if (controls.cursors.right.isDown)
      this.moveRight();
    else
      this.stand();
  }

  stand() {
    this.body.velocity.x = 0;
    this.animations.stop();
    this.frame = 0;
  }

  moveLeft() {
    this.body.velocity.x = -200;
    this.animations.play("moveLeft");
  }

  moveRight() {
    this.body.velocity.x = 200;
    this.animations.play("moveRight");
  }

  jump() {
    this.body.velocity.y = -320;
  }

}

export default Player;
