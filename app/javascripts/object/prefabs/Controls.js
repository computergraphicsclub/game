import Player from "./Player.js";


/**
 * @param {object} config configuration for control scheme
 * @param {Phaser.Game} config.game the current game object
 * @param {Phaser.Sprite} config.sprite for player
 * @param {Phaser.Debug} config.debug utility
 */
class Controls extends Phaser.Sprite {
  constructor({ game, player, debug }) {
    super(game);

    this.mapControls();
    this.initializeGamepad();

    this.setPlayerToControls(player);
    this.setDebugToControls(debug);

    console.log('controls successfully loaded');
  }

  mapControls() {
    this.controls = []
    this.mapKeyboardInput();
    this.mapMouseInput();
    this.mapGamepadInput();
  }

  mapKeyboardInput() {
    this.controls.push({
      cursors: this.game.input.keyboard.createCursorKeys(),
      wasd: {
        up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
        down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
        left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
        right: this.game.input.keyboard.addKey(Phaser.Keyboard.D)
      },
      spacebar: this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    });
  }

  mapMouseInput() {
    this.controls.push({
      mouse: {
        left: this.game.input.activePointer.leftButton,
        right: this.game.input.activePointer.rightButton
      }
    });
  }

  mapGamepadInput() {
    this.controls.push({
      dpad: {
        up: Phaser.Gamepad.XBOX360_DPAD_UP,
        down: Phaser.Gamepad.XBOX360_DPAD_DOWN,
        left: Phaser.Gamepad.XBOX360_DPAD_LEFT,
        right: Phaser.Gamepad.XBOX360_DPAD_RIGHT
      },
      abxy: {
        a: Phaser.Gamepad.XBOX360_A,
        b: Phaser.Gamepad.XBOX360_B,
        x: Phaser.Gamepad.XBOX360_X,
        y: Phaser.Gamepad.XBOX360_Y
      },
      shoulder: {
        left: Phaser.Gamepad.XBOX360_LEFT_BUMPER,
        right: Phaser.Gamepad.XBOX360_RIGHT_BUMPER,
      },
      trigger: {
        left: Phaser.Gamepad.XBOX360_LEFT_TRIGGER,
        right: Phaser.Gamepad.XBOX360_RIGHT_TRIGGER
      },
      bs: {
        back: Phaser.Gamepad.XBOX360_BACK,
        start:  Phaser.Gamepad.XBOX360_START
      },
      analog: {
        left: {
          x: Phaser.Gamepad.XBOX360_STICK_LEFT_X,
          y: Phaser.Gamepad.XBOX360_STICK_LEFT_Y
        },
        right: {
          x: Phaser.Gamepad.XBOX360_STICK_RIGHT_X,
          y: Phaser.Gamepad.XBOX360_STICK_RIGHT_Y
        }
       }
    });
  }

  enableGamepad() {
    this.game.input.gamepad.start();
    this.gamepad = this.game.input.gamepad.pad1;
    console.log('gamepad is connected');
   }

  initializeGamepad() {
    this.enableGamepad();

    // this ensures controller works if user plugs it in after loading game
    this.gamepad.addCallbacks(this, {
      onConnectCallback: this.enableGamepad(),
    });
  }

  setPlayerToControls( player ) {
    this.player = player;
  }

  setDebugToControls( debug ) {
    this.debug = debug;
  }

  keyboard() {

    // check up
    if (this.controls[0].cursors.up.isDown || this.controls[0].wasd.up.isDown )
      { this.player.moveUp(); this.debug.highlight(3); }

    // check down
    if (this.controls[0].cursors.down.isDown || this.controls[0].wasd.down.isDown )
      { this.player.moveDown(); this.debug.highlight(4); }

    // check left
    if (  this.controls[0].cursors.left.isDown || this.controls[0].wasd.left.isDown )
      { this.player.moveLeft(); this.debug.highlight(5); }

    // check right
    if (this.controls[0].cursors.right.isDown || this.controls[0].wasd.right.isDown )
      { this.player.moveRight(); this.debug.highlight(6); }

    if (this.controls[0].spacebar.isDown)
      this.player.shoot();
  }

  mouse() {
    if(this.controls[1].mouse.left.isDown) { this.player.shoot(); }
    if(this.controls[1].mouse.right.isDown) { this.player.turnTorchOn(); }
  }

  joypad() {
    // Test if joypad is dead
    if(!this.gamepad.connected) this.debug.joypadSprites.children[20].alpha = 1;

    // DPAD Controls
    if ( this.gamepad.isDown(this.controls[2].dpad.up) )   { this.player.moveUp();    this.debug.highlight(3); }
    if ( this.gamepad.isDown(this.controls[2].dpad.down) ) { this.player.moveDown();  this.debug.highlight(4); }
    if ( this.gamepad.isDown(this.controls[2].dpad.left))  { this.player.moveLeft();  this.debug.highlight(5); }
    if ( this.gamepad.isDown(this.controls[2].dpad.right)) { this.player.moveRight(); this.debug.highlight(6); }

    // LEFT ANALOG Controls
    if ( this.gamepad.axis(this.controls[2].analog.left.y) < -0.1 ) { this.player.moveUp();    this.debug.highlight(18); }
    if ( this.gamepad.axis(this.controls[2].analog.left.y) >  0.1 ) { this.player.moveDown();  this.debug.highlight(18); }
    if ( this.gamepad.axis(this.controls[2].analog.left.x) < -0.1 ) { this.player.moveLeft();  this.debug.highlight(18); }
    if ( this.gamepad.axis(this.controls[2].analog.left.x) >  0.1 ) { this.player.moveRight(); this.debug.highlight(18); }

    // RIGHT ANALOG Controls
    if ( this.gamepad.axis(this.controls[2].analog.right.y) < -0.1 ) { this.debug.highlight(19); }
    if ( this.gamepad.axis(this.controls[2].analog.right.y) >  0.1 ) { this.debug.highlight(19); }
    if ( this.gamepad.axis(this.controls[2].analog.right.x) < -0.1 ) { this.debug.highlight(19); }
    if ( this.gamepad.axis(this.controls[2].analog.right.x) >  0.1 ) { this.debug.highlight(19); }

    // ABXY Controls
    if ( this.gamepad.isDown(this.controls[2].abxy.a) ) { this.debug.highlight(7); }
    if ( this.gamepad.isDown(this.controls[2].abxy.b) ) { this.debug.highlight(8); }
    if ( this.gamepad.isDown(this.controls[2].abxy.x) ) { this.debug.highlight(9); }
    if ( this.gamepad.isDown(this.controls[2].abxy.y) ) { this.debug.highlight(10); }

    // LR Controls
    if ( this.gamepad.isDown(this.controls[2].shoulder.left) ) { this.player.torchBeamOn(); this.debug.highlight(11); }
    if ( this.gamepad.isDown(this.controls[2].shoulder.right) ) { this.player.turnTorchOn(); this.debug.highlight(12); }
    if ( this.gamepad.isDown(this.controls[2].trigger.left) )  { this.player.sprint(); this.debug.highlight(13); }
    if ( this.gamepad.isDown(this.controls[2].trigger.right) ) { this.player.shoot(); this.debug.highlight(14); }

    // BS Controls
    if ( this.gamepad.isDown(this.controls[2].bs.back) )  { this.debug.highlight(15); }
    if ( this.gamepad.isDown(this.controls[2].bs.start) ) { this.debug.highlight(16); }
  }

}

export default Controls;


/**
*

initializeControlScheme() { useKeyboardMouseControls, useControlSchemeA }


useControlSchemeA
useControlSchemeB
useControlSchemeC

useKeyboardMouseControls
useJoypadControls

*/
