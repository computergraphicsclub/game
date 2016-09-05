var play2 = {

    create: function() { 
        this.cursor = this.game.input.keyboard.createCursorKeys();
        this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT]);
        this.wasd = {
            up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
            left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
            right: this.game.input.keyboard.addKey(Phaser.Keyboard.D)
        };

        this.player = this.game.add.sprite(this.game.width/2, this.game.height/2, 'player');
        this.player.anchor.setTo(0.5, 0.5);
        this.game.physics.arcade.enable(this.player);
        this.player.body.gravity.y = 500;
        this.player.animations.add('right', [1, 2], 8, true);
        this.player.animations.add('left', [3, 4], 8, true);

        this.createWorld();
	
        this.coin = this.game.add.sprite(60, 140, 'coin');
        this.game.physics.arcade.enable(this.coin); 
        this.coin.anchor.setTo(0.5, 0.5);

        this.scoreLabel = this.game.add.text(30, 30, 'score: 0', 
            { font: '18px Arial', fill: '#ffffff' });
        this.game.global.score = 0; 

        this.enemies = this.game.add.group();
        this.enemies.enableBody = true;
        this.enemies.createMultiple(10, 'enemy');
        this.nextEnemy = 0;
	
	 //start the background musics
	
        this.music = this.game.add.audio('ost2');
        this.music.onDecoded.add(start, this);
        function start(){
        this.music.loop = true;
        //this.music.fadeIn(1000);
        this.music.fadeIn(1000);
        }
		
        this.jumpSound = this.game.add.audio('jump');
        this.coinSound = this.game.add.audio('coin');
        this.deadSound = this.game.add.audio('dead'); 

        this.emitter = this.game.add.emitter(0, 0, 15);
        this.emitter.makeParticles('pixel');
        this.emitter.setYSpeed(-150, 150);
        this.emitter.setXSpeed(-150, 150);
        this.emitter.setScale(2, 0, 2, 0, 800);
        this.emitter.gravity = 0;
        this.game.camera.follow(this.player);
    },

    update: function() {
        this.game.physics.arcade.collide(this.player, this.layer);
        this.game.physics.arcade.collide(this.enemies, this.layer);
        this.game.physics.arcade.overlap(this.player, this.coin, this.takeCoin, null, this);
        this.game.physics.arcade.overlap(this.player, this.enemies, this.playerDie, null, this);

        if (!this.player.alive) {
            return;
        }
        
        this.movePlayer(); 

        if (!this.player.inWorld) {
            this.playerDie();
        }

        if (this.nextEnemy < this.game.time.now) {
            var start = 4000, end = 1000, score = 100;
            var delay = Math.max(start - (start - end) * this.game.global.score / score, end);
            
            this.addEnemy();
            this.nextEnemy = this.game.time.now + delay;
        }
    },

    movePlayer: function() {
        if (this.cursor.left.isDown || this.wasd.left.isDown) {
            this.player.body.velocity.x = -200;
            this.player.animations.play('left');
        }
        else if (this.cursor.right.isDown || this.wasd.right.isDown) {
            this.player.body.velocity.x = 200;
            this.player.animations.play('right');
        }
        else {
            this.player.body.velocity.x = 0;
            this.player.animations.stop(); 
            this.player.frame = 0; 
        }
        
        if ((this.cursor.up.isDown || this.wasd.up.isDown) && this.player.body.onFloor()) {
            this.jumpSound.play();
            this.player.body.velocity.y = -320;
        }
    },

    takeCoin: function(player, coin) {
        this.game.global.score += 5;
        this.scoreLabel.text = 'score: ' + this.game.global.score;
        
        this.updateCoinPosition();

        this.coinSound.play();
        this.coin.scale.setTo(0, 0);
        this.game.add.tween(this.coin.scale).to({x: 1, y: 1}, 300).start();
        this.game.add.tween(this.player.scale).to({x: 1.3, y: 1.3}, 100).yoyo(true).start();
    },

    updateCoinPosition: function() {
        var coinPosition = [
            {x: 140, y: 60}, {x: 360, y: 60}, 
            {x: 60, y: 140}, {x: 440, y: 140}, 
            {x: 130, y: 300}, {x: 370, y: 300} 
        ];

        for (var i = 0; i < coinPosition.length; i++) {
            if (coinPosition[i].x == this.coin.x) {
                coinPosition.splice(i, 1);
            }
        }

        var newPosition = this.game.rnd.pick(coinPosition);
        this.coin.reset(newPosition.x, newPosition.y);
    },

    addEnemy: function() {
        var enemy = this.enemies.getFirstDead();

        if (!enemy) {
            return;
        }

        enemy.anchor.setTo(0.5, 1);
        enemy.reset(this.game.width/2, 0);
        enemy.body.gravity.y = 500;
        enemy.body.velocity.x = 100 * this.game.rnd.pick([-1, 1]);
        enemy.body.bounce.x = 1;
        enemy.checkWorldBounds = true;
        enemy.outOfBoundsKill = true;
    },

    createWorld: function() {
        this.map = this.game.add.tilemap('map'); 
        this.map.addTilesetImage('tileset'); 
        this.layer = this.map.createLayer('Tile Layer 1');
        this.layer.resizeWorld(); 
        this.map.setCollision(1);
        this.map.setTileIndexCallback(2, this.moveOn2, this);

    },

    moveOn2: function(){

    this.music.stop();
    //this.music.fadeOut();   
    setTimeout(this.level1, 3001);      
    
    //this.music.onDecoded.add(level2,this); 

    },

    level1: function(){
         
        this.game.state.start('play');
    },

    playerDie: function() {
        this.player.kill();
	    this.music.stop();
        this.deadSound.play();
        this.emitter.x = this.player.x;
        this.emitter.y = this.player.y;
        this.emitter.start(true, 800, null, 15);
        this.game.time.events.add(1000, this.startMenu, this);
        this.game.camera.shake(0.02, 300);
    },

    startMenu: function() {
        this.game.state.start('menu');
    },
};

export default play2;
