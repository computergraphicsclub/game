class Preload extends Phaser.State {

  init() {
    this.load.onLoadComplete.add( this.goToPlay, this );
  };

  preload() {
    this.loadJSONs();
    this.loadImages();
    this.loadSpritesheets();
    this.loadAudios();
    this.loadFonts();
  };

  loadJSONs() {
    this.game.load.tilemap("map", "/public/json/map.json", null, Phaser.Tilemap.TILED_JSON);
  }

  loadImages() {
    console.log("loading sprites");
    this.game.load.image("diver", "/public/images/diver.png")
    this.game.load.image("background", "/public/images/background.png");
    this.game.load.image("flashlight1", "/public/images/flashlight1.png")

    this.game.load.image("xbox", "/public/images/joypad_sprites/xbox_.png");
    this.game.load.image("xbox_dead", "/public/images/joypad_sprites/xbox_dead.png");
    this.game.load.image("xbox_abxy_A", "/public/images/joypad_sprites/xbox_abxy_A.png");
    this.game.load.image("xbox_abxy_B", "/public/images/joypad_sprites/xbox_abxy_B.png");
    this.game.load.image("xbox_abxy_X", "/public/images/joypad_sprites/xbox_abxy_X.png");
    this.game.load.image("xbox_abxy_Y", "/public/images/joypad_sprites/xbox_abxy_Y.png");
    this.game.load.image("xbox_ANALOG_L_ACTIVE", "/public/images/joypad_sprites/xbox_ANALOG_L_ACTIVE.png");
    this.game.load.image("xbox_ANALOG_L_STATIC", "/public/images/joypad_sprites/xbox_ANALOG_L_STATIC.png");
    this.game.load.image("xbox_ANALOG_R_ACTIVE", "/public/images/joypad_sprites/xbox_ANALOG_R_ACTIVE.png");
    this.game.load.image("xbox_ANALOG_R_STATIC", "/public/images/joypad_sprites/xbox_ANALOG_R_STATIC.png");
    this.game.load.image("xbox_dpad_DOWN_LEFT", "/public/images/joypad_sprites/xbox_dpad_DOWN_LEFT.png");
    this.game.load.image("xbox_dpad_DOWN_RIGHT", "/public/images/joypad_sprites/xbox_dpad_DOWN_RIGHT.png");
    this.game.load.image("xbox_dpad_DOWN", "/public/images/joypad_sprites/xbox_dpad_DOWN.png");
    this.game.load.image("xbox_dpad_LEFT", "/public/images/joypad_sprites/xbox_dpad_LEFT.png");
    this.game.load.image("xbox_dpad_RIGHT", "/public/images/joypad_sprites/xbox_dpad_RIGHT.png");
    this.game.load.image("xbox_dpad_UP_LEFT", "/public/images/joypad_sprites/xbox_dpad_UP_LEFT.png");
    this.game.load.image("xbox_dpad_UP_RIGHT", "/public/images/joypad_sprites/xbox_dpad_UP_RIGHT.png");
    this.game.load.image("xbox_dpad_UP", "/public/images/joypad_sprites/xbox_dpad_UP.png");
    this.game.load.image("xbox_hss_HOME", "/public/images/joypad_sprites/xbox_hss_HOME.png");
    this.game.load.image("xbox_hss_SELECT", "/public/images/joypad_sprites/xbox_hss_SELECT.png");
    this.game.load.image("xbox_hss_START", "/public/images/joypad_sprites/xbox_hss_START.png");
    this.game.load.image("xbox_SHOULDER_L", "/public/images/joypad_sprites/xbox_SHOULDER_L.png");
    this.game.load.image("xbox_SHOULDER_R", "/public/images/joypad_sprites/xbox_SHOULDER_R.png");
    this.game.load.image("xbox_TRIGGER_L", "/public/images/joypad_sprites/xbox_TRIGGER_L.png");
    this.game.load.image("xbox_TRIGGER_R", "/public/images/joypad_sprites/xbox_TRIGGER_R.png");
  };

  loadSpritesheets() {
    console.log("loading spritesheets");
    this.game.load.spritesheet("player", "/public/images/player.png", 20, 20);
  };

  loadAudios() {
    console.log("loading audios");
  };

  loadFonts() {
    console.log("loading fonts");
  };

  goToPlay() {
    this.game.state.start("Play");
  };

};

export default Preload;
