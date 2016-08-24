class Load extends Phaser.State {
  init() {
    this.load.onLoadComplete.add(this.goToMain, this);
  }

  preload() {
    this.loadImages();
    this.loadJSONs();
  }

  loadImages() {
    this.game.load.image("tileset", "/public/images/tileset.png");
    this.game.load.image("background", "/public/images/background.png");
    this.game.load.image("coin", "/public/images/coin.png");
    this.game.load.image("enemy", "/public/images/enemy.png");
    this.game.load.spritesheet("player", "/public/images/player.png", 20, 20);
  }

  loadJSONs() {
    this.game.load.tilemap("map", "/public/json/map.json", null, Phaser.Tilemap.TILED_JSON);
  }

  goToMain() {
    this.game.state.start("Main");
  }
}

export default Load;
