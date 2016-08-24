class LightAndShadow extends Phaser.BitmapData {
  constructor({ game, key, width, height, lightRadius}) {
    super(game, key, width, height);

    this.addShadowTexture();
    this.lightRadius = lightRadius;
  }

  addShadowTexture() {
    const shadowTexture = this.game.add.image(0, 0, this);
    shadowTexture.blendMode = Phaser.blendModes.MULTIPLY;
  }

  redraw(x, y) {
    this.redrawShadow();

    // this.redrawSoftEdgedLight(x, y);

    this.redrawTriangleLight({ x, y }, { 
      x: this.game.input.x, 
      y: this.game.input.y
    });

    this.dirty = true;
  }

  redrawShadow() {
    this.context.fillStyle = "rgb(100, 100, 100)";
    this.context.fillRect(0, 0, this.game.width, this.game.height);
  }

  redrawCircleLight(x, y) {
    this.context.beginPath();
    this.context.fillStyle = "rgb(255, 255, 255)";
    this.context.arc(x, y, this.lightRadius, 0, Math.PI * 2);
    this.context.fill();
  }

  redrawCircleSoftEdgedLight(x, y) {
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

  redrawCircleSoftEdgedFlickeringLight(x, y) {
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

  redrawTriangleLight(from, to) {
    // The light is an isosceles triangle -90 degree rotated
    // a = from, d = to
    //
    //          b
    //         /|
    //       /  |
    //     /    |
    // a /__h___|d 
    //   \      |
    //     \    |
    //       \  |
    //         \|
    //          c

    const h = Phaser.Math.distance(from.x, from.y, to.x, to.y);
    const radACD = Phaser.Math.degToRad(70);
    const radABD = Phaser.Math.degToRad(70);

    // Taking the top of the triangle above
    //
    // a
    // |\
    // |  \
    // |    \ hypothenuse
    // |      \
    // |opposite\
    // |          \
    // |____________\ b
    // d  adjacent
    const opposite = h;
    const adjacent = opposite / Math.tan(radABD);

    // Calculate coordinate b
    const bx = from.x + opposite;
    const by = from.y - adjacent;

    // Calculate coordinate c
    const cx = from.x + opposite
    const cy = from.y + adjacent;

    this.context.beginPath();
    this.context.moveTo(from.x, from.y);
    this.context.lineTo(bx, by);
    this.context.lineTo(cx, cy);
    this.context.closePath();

    this.context.fillStyle = "rgb(255, 255, 255)";
    this.context.fill();
  }

}

export default LightAndShadow;
