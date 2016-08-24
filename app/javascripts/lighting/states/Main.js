import Map from "../prefabs/Map";
import Player from "../prefabs/Player";
import LightAndShadow from "../prefabs/LightAndShadow";

class Main extends Phaser.State {
  create() {
    this.setupPhysics();
    this.createMap();
    this.createPlayer();
    this.createShadow();
    this.setupControls();
  }

  setupPhysics() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
  }

  createMap() {
    this.map = new Map({
      game: this.game,
      key: "map",
      tileset: "tileset",
      backgroundColor: "2dc9ff"
    });
    this.layer = this.map.addLayerAndCollision("Tile Layer 1");
  }

  createShadow() {
    this.lightAndShadow = new LightAndShadow({ 
      game: this.game, 
      key: "shadow",
      width: this.game.width,
      height: this.game.height,
      lightRadius: 100
    });
  }

  createPlayer() {
    this.player = new Player({
      game: this.game,
      x: 30,
      y: 350,
      key: "player"
    });
  }

  jumpPlayer() {
    this.player.jump();
  }

  setupControls() {
    this.controls = {
      cursors: this.game.input.keyboard.createCursorKeys(),
      spacebar: this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    };

    // For event based controls
    // Update based controls (hold based keys)
    // do it in update
    this.controls.spacebar.onDown.add(this.jumpPlayer, this);
  }

  update() {
    this.game.physics.arcade.collide(this.player, this.layer);
    this.player.move(this.controls);
    this.lightAndShadow.redraw(this.player.x, this.player.y);
  }








}

export default Main;
