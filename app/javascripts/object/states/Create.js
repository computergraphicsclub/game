import Player from '../prefabs/Player';
import Controls from '../prefabs/Controls';
import Debug from '../Debug';
import Map from '../prefabs/Map';
import Physics from '../prefabs/Physics';
import Torch from '../prefabs/Torch';

class Create extends Phaser.State {

  create() {
    console.log('starting create');

    // keeps right click from displaying menu
    this.game.canvas.oncontextmenu = function (e) { e.preventDefault(); }

    this.createDebug();
    this.createMap();
    this.createPlayer();
    this.createControls();
    this.createPhysics();
    this.createTorch();
  }

  createMap() {
    console.log('creating map')
    this.map = new Map({
      game: this.game,
      key: "map",
      tileset: "tileset",
      layer: "Tile Layer 1",
      backgroundColor: "2dc9ff"
    });
  }

  createPhysics() {
    console.log('creating physics')
    this.physics = new Physics({
      game: this.game,
      player: this.player
    });
  }

  createPlayer() {
    console.log('spawning player')
    this.player = new Player({
      game: this.game,
      x: this.game.world.centerX,
      y: this.game.world.centerY,
      asset: 'player'
    });
  }

  createControls() {
    this.controls = new Controls({
      game: this.game,
      player: this.player,
      debug: this.debug
    });
  }

  createTorch() {
    this.torch = new Torch({
      game: this.game,
      map: this.map
    });
    console.log('torch created')
  }

  createDebug() {
    this.debug = new Debug ({
      game: this.game,
    });
  }

  update() {
    this.physics.update();
    this.debug.update();
    this.controls.update();
    this.torch.update(this.player);
    this.player.update();
    // this.lightAndShadow.update(this.player.x, this.player.y);
  }

  render() {
    this.debug.printDebug(this.player);
  }

}

export default Create;
