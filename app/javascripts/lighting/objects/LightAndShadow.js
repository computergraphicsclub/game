class LightAndShadow {
  constructor({ game, lightRadius }) {
    this.game = game;

    this.lightRadius = lightRadius;

    // Make the shadow image using Phaser.BitmapData
    this.shadowTexture = new Phaser.BitmapData(this.game, "shadow", this.game.width, this.game.height);
    // this.shadowTexture.blendMultiply();

    // Actually adding the image into the stage
    this.shadowImage = this.game.add.image(0, 0, this.shadowTexture);
    // Set image's blend mode to MULTIPLY to darken 
    // everything affected by this image
    this.shadowImage = Phaser.blendModes.MULTIPLY;

  }

  update() {
    // This function updates the shadow texture (this.shadowTexture).
    // First, it fills the entire texture with a dark shadow color.
    // Then it draws a white circle centered on the pointer position.
    // Because the texture is drawn to the screen using the MULTIPLY
    // blend mode, the dark areas of the texture make all of the colors
    // underneath it darker, while the white area is unaffected.
    this.drawShadow();

    // 3 choices of circle of light
    // uncomment either to try
    // this.drawCircleOfLight();
    this.drawCircleOfLightWithSoftEdges(true);
    // this.drawCircleOfLightWithSoftEdges();

    // This just tells the engine it should update the texture cache
    this.shadowTexture.dirty = true;
  }

  drawShadow() {
    this.shadowTexture.context.fillStyle = "rgb(100, 100, 100)";
    this.shadowTexture.context.fillRect(0, 0, this.game.width, this.game.height);
  }

  drawCircleOfLight() {
    this.shadowTexture.context.beginPath();
    this.shadowTexture.context.fillStyle = "rgb(255, 255, 255)";
    this.shadowTexture.context.arc(this.game.input.activePointer.x, this.game.input.activePointer.y, this.lightRadius, 0, Math.PI * 2);
    this.shadowTexture.context.fill();
  }

  drawCircleOfLightWithSoftEdges(flicker) {
    let innerRadius = this.lightRadius;
    
    // Simulate a flickering gradient
    if (flicker) innerRadius += this.game.rnd.integerInRange(1,10);

    // context is a Canvas object
    // createRadialGradient is a canvas API
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createRadialGradient
    const gradient = this.shadowTexture.context.createRadialGradient(
      this.game.input.activePointer.x, this.game.input.activePointer.y, this.lightRadius * 0.75,
      this.game.input.activePointer.x, this.game.input.activePointer.y, innerRadius
    );

    gradient.addColorStop(0, "rgba(255, 255, 255, 1.0)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0.0)");

    this.shadowTexture.context.beginPath();
    // Instead of "rgb(255, 255, 255)" 
    // change the fillStyle to the newly created gradient
    this.shadowTexture.context.fillStyle = gradient;
    this.shadowTexture.context.arc(
      this.game.input.activePointer.x, this.game.input.activePointer.y,
      innerRadius, 0, Math.PI * 2
    );
    this.shadowTexture.context.fill();
  }
}

export default LightAndShadow;
