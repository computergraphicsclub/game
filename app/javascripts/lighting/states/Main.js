import Map from "../prefabs/Map";
import Player from "../prefabs/Player";
import LightAndShadow from "../prefabs/LightAndShadow";

class Main extends Phaser.State {
  create() {
    this.setupPhysics();
    this.setupControls();
    this.createMap();
    this.createShadow();
    this.createPlayer();
  }

  setupPhysics() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
  }

  setupControls() {
    this.controls = {
      cursors: this.game.input.keyboard.createCursorKeys(),
      spacebar: this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    };
  }

  createMap() {
    this.map = new Map({
      game: this.game,
      key: "map",
      tileset: "tileset",
      layer: "Tile Layer 1",
      backgroundColor: "2dc9ff"
    });
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
      y: 30,
      key: "player"
    });
  }

  update() {
    this.game.physics.arcade.collide(this.player, this.map);

    this.player.move(this.controls);
    this.lightAndShadow.redraw(this.player.x, this.player.y);
  }








}

export default Main;
