class Map extends Phaser.Tilemap {
  constructor({ game, key, tileset, layer, backgroundColor }) {
    super(game, key);

    this.setBackgroundColor(backgroundColor);
    this.addTilesetImage(tileset);
    this.addLayer(layer);
    this.setCollision(0);
  }

  setBackgroundColor(color) {
    this.game.stage.backgroundColor = color;
  }

  addLayer(layer) {
    const _layer = this.createLayer(layer);
    _layer.resizeWorld();
  }
}

export default Map;
