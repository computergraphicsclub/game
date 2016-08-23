/**
 * Main App
 * 
 * DO NOT CODE HERE YET
 */

class Boot extends Phaser.State {
   init() {
     const x = this.game.world.centerX;
     const y = this.game.world.centerY - 100;

     const text = "Necronautica";
     const style = {
       fill: "#FFFFFF"
     };

    const title = this.game.add.text(x, y, text, style);
    title.anchor.x = 0.5;
    title.anchor.y = 0.5;

    const tween = this.game.add.tween(title);
    tween
      .to({ y: y + 100 }, 1000)
      .easing(Phaser.Easing.Bounce.Out)
      .start();
  }
}

class Game extends Phaser.Game {
  constructor(width, height, engine, domNode) {
    super(width, height, engine, domNode);

    this.state.add("Boot", Boot, false);
  }

  start() {
    this.state.start("Boot");
  }
}

if (window.location.pathname == "/") {
  const necronautica = new Game(1140, 300, Phaser.AUTO, "necronautica");
  necronautica.start();
}

console.log(`
===================
This is main app,
DO NOT code in this
file yet
===================
`);

