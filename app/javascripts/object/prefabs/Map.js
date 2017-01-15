class Map extends Phaser.Tilemap {

  /**
   * @param {object} config game configuration
   * @param {string} config.key name of the map
   * @param {string} config.tileset name of tileset
   * @param {string} config.layer number of tileset layer
   * @param {string} config.backgroundColor hexidecimal value
   */
  constructor({ game, key, tileset, layer, backgroundColor }) {
    super(game, key);

    this.setBackgroundColor(backgroundColor);
    // this.addTilesetImage(tileset);
    // this.addLayer(layer);
    this.setCollision(0);
    this.setupObstructions();
  }

  setBackgroundColor(color) {
    this.game.stage.backgroundColor = color;
  }

  addLayer(layer) {
    const _layer = this.createLayer(layer);
    _layer.resizeWorld();
  }

  setupObstructions() {
    // Build some walls. These will block line of sight.
    var NUMBER_OF_WALLS = 16;
    this.walls = this.game.add.group();
    var i, x, y;
    for(i = 0; i < NUMBER_OF_WALLS; i++) {
      x = i * this.game.width/NUMBER_OF_WALLS + 50;
      y = this.game.rnd.integerInRange(50, this.game.height - 200);
      this.game.add.image(x, y, 'square', 0, this.walls).scale.setTo(1, 1);
    }
  }

}

export default Map;
