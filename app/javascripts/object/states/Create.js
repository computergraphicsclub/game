import Player from '../prefabs/Player';
import Controls from '../prefabs/Controls';
import Debug from '../Debug';
import Map from '../prefabs/Map';
import Physics from '../prefabs/Physics';
import Torch from '../prefabs/Torch';
// import Example from '../prefabs/Example';

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
    // this.createExample();
  }

  /**
  createExample() {
    console.log('creating example')
    this.example = new Example({
      param_1: this.param_1,
      param_2: this.param_2,
      ...,
      param_n: this.param_n,
    });
  }
  */

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

    // this.example.update();
  }

  render() {
    this.debug.printDebug(this.player);
  }

}

export default Create;


/**
 To make your prefab do the following:
  1. touch ClassName.js in prefab directory
  2. edit ClassName.js and set up like Example.js
  3. Inside of Create.js
    a. import your ClassName.js
    b. write a proper createClassName function
    c. call createClassName() function inside of create() function
    d. call className.update() function inside of create() function
*/
