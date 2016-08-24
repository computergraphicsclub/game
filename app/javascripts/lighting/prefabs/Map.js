class Map extends Phaser.Tilemap {
  constructor({ game, key, tileset, backgroundColor }) {
    super(game, key);

    this.setBackgroundColor(backgroundColor);
    this.addTilesetImage(tileset);
  }

  setBackgroundColor(color) {
    this.game.stage.backgroundColor = color;
  }

  addLayerAndCollision(layer) {
    const _layer = this.createLayer(layer);
    _layer.resizeWorld();

    this.setCollision(1);

    return _layer;
  }
}

export default Map;
