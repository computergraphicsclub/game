class Shadow extends Phaser.BitmapData {
  constructor({ game, key, width, height, lightRadius}) {
    super(game, key, width, height);

    this.addShadowTexture();
    this.lightRadius = lightRadius;
  }

  addShadowTexture() {
    const shadowTexture = this.game.add.image(0, 0, this);
    shadowTexture.blendMode = Phaser.blendModes.MULTIPLY;
  }

  redrawLightAndShadow(x, y) {
    this.redrawShadow();
    this.redrawSoftEdgedLight(x, y);
    this.dirty = true;
  }

  redrawShadow() {
    this.context.fillStyle = "rgb(100, 100, 100)";
    this.context.fillRect(0, 0, this.game.width, this.game.height);
  }

  redrawLight(x, y) {
    this.context.beginPath();
    this.context.fillStyle = "rgb(255, 255, 255)";
    this.context.arc(x, y, this.lightRadius, 0, Math.PI * 2);
    this.context.fill();
  }

  redrawSoftEdgedLight(x, y) {
    const innerRadius = this.lightRadius;

    const gradient = this.context
      .createRadialGradient(
        x, y, this.lightRadius * 0.75,
        x, y, innerRadius
      );

    gradient.addColorStop(0, "rgba(255, 255, 255, 1.0");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0.0");

    this.context.beginPath();
    this.context.fillStyle = gradient;
    this.context.arc(x, y, this.lightRadius, 0, Math.PI * 2);
    this.context.fill();
  }

  redrawSoftEdgedFlickeringLight(x, y) {
    const innerRadius = this.game.rnd.integerInRange(1, 10);

    const gradient = this.context
      .createRadialGradient(
        x, y, this.lightRadius * 0.75,
        x, y, innerRadius
      );

    gradient.addColorStop(0, "rgba(255, 255, 255, 1.0");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0.0");

    this.context.beginPath();
    this.context.fillStyle = gradient;
    this.context.arc(x, y, this.lightRadius, 0, Math.PI * 2);
    this.context.fill();
  }

}

export default Shadow;
