import Preload from "./states/Preload";
import Play from "./states/Play"

/**
 *
 * @param {object} config game configuration
 * @param {number} config.width game width in pixels
 * @param {number} config.height game height in pixels
 * @param {Phaser.Physics} config.engine game physics
 * @param {string} config.domNode DOM id where the game mounts
 */


class Game extends Phaser.Game {
  constructor(width, height, engine, domNode) {
    super(width, height, engine, domNode);

    this.state.add("Preload", Preload, false);
    this.state.add("Play", Play, false);
  };

  start() {
    this.state.start("Preload");
  }
};

export default Game;
