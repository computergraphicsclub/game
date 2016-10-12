import Preload from "./states/Preload";
import Create from "./states/Create"
import Update from "./states/Update"

/**
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
    this.state.add("Create",  Create, false);
    // this.state.add("Update",  Update, false);
  };

  start() {
    this.state.start("Preload");
  }
};

export default Game;
