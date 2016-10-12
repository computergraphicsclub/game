class Physics extends Phaser.Physics {
  constructor({ game, player, map }) {
    super(game);
    this.startPhysicsSystem();
    this.setupPlayer(player);
    this.map = map;
  }

  setupPlayer( player ) {
    this.player = player;
    this.game.physics.arcade.enable(this.player);
  }

  startPhysicsSystem() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
  }

  update() {
    this.game.physics.arcade.collide(this.player, this.map);
  }
}

export default Physics;
