class Player extends Phaser.Sprite {

  /**
   * @param {object} config sprite configuration
   * @param {Phaser.Game} config.game the current game object
   * @param {number} config.x x-axis coordinate of the sprite in pixels
   * @param {number} config.y y-axis coordinate of the sprite in pixels
   * @param {string} config.asset preloaded asset name
   */

  constructor({ game, x, y, asset }) {
    super( game, x, y, asset );
    this.loadPlayerDefaults();
    console.log('player successfully loaded');
  };

  loadPlayerDefaults(x, y, asset) {
    this.setPlayerSprite();
    this.setPlayerInventory();
  };

  setPlayerSprite() {
    this.game.add.existing(this);
    this.torchSprite = this.game.add.sprite(this.x, this.y, 'torch');
    this.anchor.setTo(0.5, 0.5);
  }

  setPlayerInventory() {
    this.torchEnabled = false;
    this.torchBeam = false;
    this.harpoons = 100;
    this.oxygen = 100;
    this.health = 100;
    this.dead = false;
    this.speed = 1;
  }

  /**
   *  Determine how player moves later
   */
  moveUp() {
    this.y -= 3;
  }

  moveDown() {
    this.y += 3;
  }

  moveLeft() {
    this.x -= 3;
  }

  moveRight() {
    this.x += 3;
  }

  sprint() {
    this.speed = 2;
  }

  toggleTorchOn() {
    if(this.torchEnabled) this.torchEnabled = false;
    else this.torchEnabled = true;
  }

  toggleTorchMode() {
    if(this.torchBeam) this.torchBeam = false;
    else this.torchBeam = true;
  }

  shoot() {
    this.harpoons -= 1;
    console.log('shooting');
  }

  torchRotation() {
    this.torchSprite.rotation = this.game.physics.arcade.angleToPointer(this.torchSprite);
  }

  torchAngle() {
    return this.convertAngle(this.torchSprite.angle);
  }

  convertAngle( angle ) {
    if(angle < 0) return Math.abs(angle);
    else return (360 - angle);
  }

  update() {
    this.torchSprite.x = this.x;
    this.torchSprite.y = this.y;
  }
};

export default Player;
