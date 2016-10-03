import Player from '../prefabs/Player';
import Controls from '../prefabs/Controls';
import LightAndShadow from "../prefabs/LightAndShadow";
import Debug from '../Debug';

class Play extends Phaser.State {

  create() {
    console.log('creating Play');
    this.startDebug();
    this.createPlayer();
    this.createPlayerControls();
    // this.createShadow();
  }

  createPlayer() {
    console.log('spawning player')
    this.player = new Player({
      game: this.game,
      x: this.game.world.centerX,
      y: this.game.world.centerY,
      asset: 'player'
    });
  };

  createPlayerControls() {
    this.playerControls = new Controls({
      game: this.game,
      player: this.player,
      debug: this.debug
    });
  };

  createShadow() {
    this.lightAndShadow = new LightAndShadow({
      game: this.game,
      key: "shadow",
      width: this.game.width,
      height: this.game.height,
      lightRadius: 100
    });
  }

  startDebug() {
    this.debug = new Debug ({
      game: this.game,
    });
  }

  destroyPlayer() {
    this.player.destroy();
  };

  update() {
    this.debug.disableAllActiveButtons();
    this.playerControls.keyboard();
    this.playerControls.mouse();
    this.playerControls.joypad();
    // this.lightAndShadow.redraw(this.player.x, this.player.y);
  };

  render() {
    this.debug.printDebug(this.player);
  };

};

export default Play;
