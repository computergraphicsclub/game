import Diver from "../objects/Diver";
import LightAndShadow from "../objects/LightAndShadow";

class Main extends Phaser.State {
  init() {}

  preload() {
    this.game.load.image("diver", "/public/images/diver.png");
  }

  create() {
    this.game.stage.backgroundColor = 0x4488cc;

    this.diver = new Diver({
      game: this.game, 
      x: 200, 
      y: 200, 
      asset: "diver"
    });

    this.lightAndShadow = new LightAndShadow({ 
      game: this.game, 
      lightRadius: 100 
    });
  }

  update() {
    this.lightAndShadow.update();

    // Because this is an extension of
    // Phaser.Sprite class
    // update will be called automatically anyway
    // I put it here just to make it consistent
    this.diver.update();
  }
}

export default Main;
