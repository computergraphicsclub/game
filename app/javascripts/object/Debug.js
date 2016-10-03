  class Debug extends Phaser.Utils.Debug {

    /**
    * @param {object} config debug utility
    * @param {Phaser.Game} config.game the current game object
    * @param {boolean} config.bool set to display debug
    */
    constructor({ game }) {
      super(game);

      this.enabled = false;
      this.enableDebug();

      this.setupJoypadSprites(1000, 10);
    }

    isEnabled() { return this.enabled };
    enableDebug(){ this.enabled = true };
    disableDebug(){ this.enabled = false };

    printDebug(player) {
      if (this.isEnabled()) {
        this.game.debug.text('harpoons: '+player.harpoons+'', player.x - 140, player.y - 15);
        this.game.debug.text(' torch on: '+player.torchOn+'', player.x - 170, player.y + 5);
        this.game.debug.text('  beam on: '+player.torchBeam+'', player.x - 170, player.y + 25);
      }
    }

    setupJoypadSprites(x, y) {
      this.addAllJoypadSprites(x, y);
      this.disableAllActiveButtons();
    }

    addAllJoypadSprites(x, y) {
      // creates joypad group
      this.joypadSprites = this.game.add.group();

      // loads background sprites (children 0 - 2)
      this.joypadSprites.create( x, y, 'xbox' );
      this.joypadSprites.create( x, y, 'xbox_ANALOG_L_STATIC' );
      this.joypadSprites.create( x, y, 'xbox_ANALOG_R_STATIC' );

      // loads foreground sprites for active buttons (childred 3 - *)
      this.joypadSprites.create( x, y, 'xbox_dpad_UP' );          // 3
      this.joypadSprites.create( x, y, 'xbox_dpad_DOWN' );        // 4
      this.joypadSprites.create( x, y, 'xbox_dpad_LEFT' );        // 5
      this.joypadSprites.create( x, y, 'xbox_dpad_RIGHT' );       // 6
      this.joypadSprites.create( x, y, 'xbox_abxy_A' );           // 7
      this.joypadSprites.create( x, y, 'xbox_abxy_B' );           // 8
      this.joypadSprites.create( x, y, 'xbox_abxy_X' );           // 9
      this.joypadSprites.create( x, y, 'xbox_abxy_Y' );           // 10
      this.joypadSprites.create( x, y, 'xbox_SHOULDER_L' );       // 11
      this.joypadSprites.create( x, y, 'xbox_SHOULDER_R' );       // 12
      this.joypadSprites.create( x, y, 'xbox_TRIGGER_L' );        // 13
      this.joypadSprites.create( x, y, 'xbox_TRIGGER_R' );        // 14
      this.joypadSprites.create( x, y, 'xbox_hss_SELECT' );       // 15
      this.joypadSprites.create( x, y, 'xbox_hss_START' );        // 16
      this.joypadSprites.create( x, y, 'xbox_hss_HOME' );         // 17
      this.joypadSprites.create( x, y, 'xbox_ANALOG_L_ACTIVE' );  // 18
      this.joypadSprites.create( x, y, 'xbox_ANALOG_R_ACTIVE' );  // 19
      this.joypadSprites.create( x, y, 'xbox_dead');              // 20
    };

    disableAllActiveButtons() {
      for ( var i = 3; i < this.joypadSprites.length; i++)
        this.joypadSprites.children[i].alpha = 0;
    }

    highlight( button ) { this.joypadSprites.children[button].alpha = 1; }

  };

  export default Debug;
