var game = new Phaser.Game(1140, 400, Phaser.AUTO, "game", {
  preload: preload,
  create: create,
  update: update,
  render: render
});

console.log("control");

//Game Objects
var player,
    enemies = [], // ex: jellyfish
    enemyAmount = 3,
    item;

//Player Stats
var speedDefault = 3,
    speedFast = 6,
    speedDodge = 40,
    oxygen = 100,
    health = 2;

//Inputs
var cursors,
    leftKey,
    rightKey,
    upKey,
    downKey,
    accelerateKey,
    dodgeKey,
    pad,
    testButton;

// Object called Player
var Player = function(game, oxygen, health, speedDefault, speedFast) {

  this.game = game;

  // Player's Location
  this.x = game.world.centerX;
  this.y = game.world.centerY;

  // Player's Physical Form
  this.sizeX = 50;
  this.sizeY = 50;
  this.boundingBox = new Phaser.Rectangle(this.x, this.y, this.sizeX, this.sizeY);
  // this.boundingBox = game.add.sprite(this.x, this.y, 'square', 'boundingBox')
  // player.boundingBox.anchor.setTo(0.5, 0.5);
  // this.game.camera.follow(this.boundingBox);

  // Player's Living Stats
  this.oxygen = oxygen;
  this.health = health;
  this.dead = false;

  // Player's Item Stats
  this.torchOn = false;
  this.harpoons = 25;

  // Player's Movement Stats
  this.speedDefault = speedDefault;
  this.speedCurrent = speedDefault;
  this.speedFast = speedFast;
  this.speedDodge = speedDodge;

  this.playerKeyOnDown();
  this.addPadCallBack();

}

// This holds on the player data that need to be updated during the game
Player.prototype.update = function() {
  this.updateKeyIsDown();
}

//Inputs that can be held down
Player.prototype.updateKeyIsDown = function () {
  // WASD - UDLR Controls and Pad UDLR
  if (cursors.left.isDown ||
      leftKey.isDown ||
      pad.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) ||
      pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1)
  {
      this.boundingBox.x -= this.speedCurrent;
      this.boundingBox.angle = -15;
  }
  if (cursors.right.isDown ||
      rightKey.isDown ||
      pad.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) ||
      pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1)
  {
      this.boundingBox.x += this.speedCurrent;
      this.boundingBox.angle = 15;
  }
  if (cursors.up.isDown ||
      upKey.isDown ||
      pad.isDown(Phaser.Gamepad.XBOX360_DPAD_UP) ||
      pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1)
  {
      this.boundingBox.y -= this.speedCurrent;
      this.boundingBox.angle = 15;
  }
  if (cursors.down.isDown ||
      downKey.isDown ||
      pad.isDown(Phaser.Gamepad.XBOX360_DPAD_DOWN) ||
      pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1)
  {
      this.boundingBox.y += this.speedCurrent;
      this.boundingBox.angle = 15;
  }

  // Acceleration for Keyboard and Pad
  if (accelerateKey.isDown ||
      pad.isDown(Phaser.Gamepad.XBOX360_LEFT_BUMPER))
  {
      this.accelerateOn();
  }
  else
  {
      this.accelerateOff();
      this.rotation = 0;
  }

}

//Inputs that can be only be pressed once
Player.prototype.playerKeyOnDown = function () {
  // When left and/or right click is pressed, it triggers the designinated function
  game.input.activePointer.leftButton.onDown.add(this.shoot, this);
  game.input.activePointer.rightButton.onDown.add(this.torchToggle, this);

  // When dodgeKey is pressed it triggers the designated function
  dodgeKey.onDown.add(this.dodgeActivate, this);

}

//When a pad is connected it will run a given function
Player.prototype.addPadCallBack= function () {
  pad.addCallbacks(this, {
    onConnect: createPadControls});
}

//Player speed will increase to Fast
Player.prototype.accelerateOn = function () {
    this.speedCurrent = this.speedFast
}

//Player speed will decrease to default
Player.prototype.accelerateOff = function () {
  this.speedCurrent = this.speedDefault;
}

//Player speed get a short burst of speed........
//??????????I do not know how the game brings the player speed back to default
Player.prototype.dodgeActivate = function () {
  this.speedCurrent=this.speedDodge;
}

//Player will reduce harpoons by 1
Player.prototype.shoot = function() {
  if(this.harpoons >= 1)
  {
  this.harpoons--;
  }
}

//Player will turn the torch on and off
Player.prototype.torchToggle = function() {
  this.torchOn = !this.torchOn;
}

//Assigns keyboard to variables and starts the gamepad.start();
function createControls() {
  //Creates arrow keys automatically. naming this cursor.left, cursor.right, etc...
  cursors = game.input.keyboard.createCursorKeys();
  // Populates a varible with the key that is added
  leftKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
  rightKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
  upKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
  downKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
  accelerateKey = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
  dodgeKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  // This is the game pad event handling
  game.input.gamepad.start();
  pad = game.input.gamepad.pad1;
}

// Creates and Assigns Pad buttons
//???????Can't get the DPAD to work
function createPadControls(){
  var buttonLeftBumper = pad.getButton(Phaser.Gamepad.XBOX360_LEFT_BUMPER),
      buttonRightBumper = pad.getButton(Phaser.Gamepad.XBOX360_RIGHT_BUMPER),
      buttonLeftTrigger = pad.getButton(Phaser.Gamepad.XBOX360_LEFT_TRIGGER),
      buttonRightTrigger = pad.getButton(Phaser.Gamepad.XBOX360_RIGHT_TRIGGER);

      //I can't get the DPAD to work
      //buttonDPLeft = pad.getButton(Phaser.Gamepad.XBOX360_DPAD_LEFT),
      //buttonDPRight = pad.getButton(Phaser.Gamepad.XBOX360_DPAD_RIGHT),
      //buttonDPUp = pad.getButton(Phaser.Gamepad.XBOX360_DPAD_UP),
      //buttonDPDown = pad.getButton(Phaser.Gamepad.XBOX360_DPAD_DOWN);

      //Bind onDown function to these buttons
      buttonLeftTrigger.onDown.add(this.torchToggle, this);
      buttonRightTrigger.onDown.add(this.shoot, this);
      buttonRightBumper.onDown.add(this.dodgeActivate, this);
}

/*---------------------------------------------------------------------------*/

//Phaser runs this function first, this loads the assets into the game
function preload() {
  game.world.setBounds(0, 0, 1140, 400);
}

//This is called once after preload
function create() {
  //disables context menu when right click is pressed
  game.canvas.oncontextmenu = function (e){
    e.preventDefault();
  }
  createControls();
  player = new Player(game, oxygen, health, speedDefault, speedFast);
}

//This is called at every frame the game
function update() {
  player.update();
}

//This is mostly for debug overlays...I think
function render() {
  game.debug.geom(player.boundingBox);
  game.debug.text('Torch:'+player.torchOn, 20, 40);
  game.debug.text('Harpoons:'+ player.harpoons, 20, 60);
  game.debug.text('Speed: '+player.speedCurrent, 20, 80);
  game.debug.text('Mouse Position:(' +game.input.activePointer.x+ ','
                                     +game.input.activePointer.y+')',  20, 100);
  game.debug.text('Pad statuts: '+pad.connected, 20, 120);
}
