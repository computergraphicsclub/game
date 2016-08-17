var game = new Phaser.Game(1140, 400, Phaser.AUTO, "game", {
  preload: preload,
  create: create,
  update: update,
  render: render
});

console.log("object");

var Player = function(game, oxygen, health, speedDefault, speedFast) {

  this.game = game;

  // Player's Location
  this.x = game.world.centerX;
  this.y = game.world.centerY;

  // Player's Physical Form
  this.sizeX = 50;
  this.sizeY = 50;
  // this.boundingBox = new Phaser.Rectangle(this.x, this.y, this.sizeX, this.sizeY);
  this.boundingBox = game.add.sprite(this.x, this.y, 'square', 'boundingBox')
  // player.boundingBox.anchor.setTo(0.5, 0.5);
  this.game.camera.follow(this.boundingBox);

  // Player's Living Stats
  this.oxygen = oxygen;
  this.health = health;
  this.dead = false;

  // Player's Item Stats
  this.torchOn = false;
  this.harpoons = 3;

  // Player's Movement Stats
  this.speedDefault = speedDefault;
  this.speedCurrent = speedDefault;
  this.speedFast = speedFast;
}

Player.prototype.update = function() {
  // WASD - UDLR Controls
  if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)||
      game.input.keyboard.isDown(Phaser.Keyboard.A))
  {
      this.boundingBox.x -= this.speedCurrent;
      this.boundingBox.angle = -15;
  }
  if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) ||
      game.input.keyboard.isDown(Phaser.Keyboard.D))
  {
      this.boundingBox.x += this.speedCurrent;
      this.boundingBox.angle = 15;
  }
  if (game.input.keyboard.isDown(Phaser.Keyboard.UP) ||
      game.input.keyboard.isDown(Phaser.Keyboard.W))
  {
      this.boundingBox.y -= this.speedCurrent;
      this.boundingBox.angle = 15;
  }
  if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN) ||
      game.input.keyboard.isDown(Phaser.Keyboard.S))
  {
      this.boundingBox.y += this.speedCurrent;
      this.boundingBox.angle = 15;
  }


  if (game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)    ||
      game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
  {
      this.boostOn();
  }
  else
  {
      this.boostOff();
      this.rotation = 0;
  }
}

Player.prototype.boostOn = function () {
  this.speedCurrent = this.speedFast;
};

Player.prototype.boostOff = function () {
  this.speedCurrent = this.speedDefault;
}

var Enemy = function(game, health) {

  this.game = game;

  // Enemy's Location
  this.x = game.world.randomX;
  this.y = game.world.randomY;

  // Enemy's Physical Form
  this.radius = 25;
  this.boundingBox = new Phaser.Circle(this.x, this.y, this.radius);

  // Player's Living Stats
  this.health = health;
  this.dead = false;
}

Enemy.prototype.update = function () {
  // no updates yet
}

var player,
    enemies = [], // ex: jellyfish
    enemyAmount = 3,
    item;

var speedDefault = 3,
    speedFast = 6,
    oxygen = 100,
    health = 2;

var pad,
    testButton;


/* ------------------------------------------------------------------ */

function preload() {
  game.world.setBounds(0, 0, 2280, 800)
  // game.load.image('player', 'assets/test/square.png')
}

function create() {
  player = new Player(game, oxygen, health, speedDefault, speedFast);
  for (var i = 0; i < enemyAmount; i++) enemies.push(new Enemy(game, 5));
  // item = new Phaser.RoundedRectangle(200, 100, 35, 35, 20);
}

function update() {
  player.update();
  for (var i in enemies) enemies[i].update();
}

function render() {
    game.debug.geom(player.boundingBox)
    for (var i in enemies) game.debug.geom(enemies[i].boundingBox)
    // game.debug.geom(item)

    game.debug.text('Player Stats', 40, 40)
    game.debug.text('Speed: ' + player.speedCurrent , 40, 60)
    game.debug.text('Location(' + player.boundingBox.x + ','
                                + player.boundingBox.y + ')', 40, 80)
    game.debug.text('Health: ' + player.health, 40);
}
