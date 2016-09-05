

var play = {

    /*preload: function() {
        game.load.image('player', 'assets/player.png');
        game.load.image('wallV', 'assets/wallVertical.png');
        game.load.image('wallH', 'assets/wallHorizontal.png');
        game.load.image('coin', 'assets/coin.png');
        game.load.image('enemy', 'assets/enemy.png')
    },*/

    create: function() {
        /* //change the background color of our stage of 500 by 340
        game.stage.backgroundColor = '#3498db';

        game.physics.startSystem(Phaser.Physics.ARCADE);

        // make sure that everything looks crisp
        game.renderer.renderSession.roundPixels = true; */

        //allows up to have cursor input for our character
        this.cursor = this.game.input.keyboard.createCursorKeys();

        if(!this.game.device.desktop){
            this.game.addMobileInputs();
        }

        //start the background musics

        this.music = this.game.add.audio('ost1');
        this.music.onDecoded.add(start, this);
        function start(){
        this.music.loop = true;
        //this.music.fadeIn(1000);
        this.music.fadeIn(1000);
        }


        //adds sprite to middle of schreen (non anchored)
        this.player = this.game.add.sprite(this.game.width/2, this.game.height/2, 'player');
        // centers our player to exactly the middle of the screen
        this.player.anchor.setTo(0.5, 0.5);
        //We will use the  arcade physics engine
        this.game.physics.arcade.enable(this.player);
        //Adds vertical gravity to our player
        this.player.body.gravity.y = 500;

        //when player moves to the right
        this.player.animations.add('right', [1,2],8, true);
	
        //when player moves to the left
        this.player.animations.add('left', [3,4], 8, true);
	console.log(this.player.animations);
        //we create all the walls
        this.createWorld();

        //add coin object in game function
        this.coin = this.game.add.sprite(60, 140, 'coin');

        //add arcade physics to the coin
        this.game.physics.arcade.enable(this.coin);

        // Set anchor point to its center
        this.coin.anchor.setTo(0.5, 0.5);

        //Display the score, location, text, and styles: text will be changed via update
        this.scoreLabel = this.game.add.text(30,30 , 'score: 0',
            {font: '18px Arial', fill: '#ffffff'});
	this.scoreLabel.fixedToCamera = true;
        /*//initalize the score variable
        this.score = 0;*/

        this.game.global.score= 0;

        //create pause menu
        /*this.pauseLabel = this.game.add.text(30 , 40, 'Pause', { font: '24px Arial', fill: '#fff'});
        this.pauseLabel.inputEnabled = true;*/



	var gamethis = this;
	console.log(gamethis);
        this.jumpSound = this.game.add.audio('jump');
        this.coinSound = this.game.add.audio('coin');
        this.deadSound = this.game.add.audio('dead');
        //create an enemy group with Arcade physics
        this.enemies = this.game.add.group();
        this.enemies.enableBody = true;

        //create 10 enemies in the group with  the 'enemy' image
        //Enemies are 'dead' by default so they are not visable in the game

        this.enemies.createMultiple(2,'enemy');

        //call 'addEnemy' every 2.2 seconds

        this.game.time.events.loop(2200, this.addEnemy, this);


        //create emitter with 15 particles. We dont need to set the x y since we dont know where to do the explosion yet
        this.emitter = this.game.add.emitter(0,0,15);

        //set the 'pixel' image for the particles

        this.emitter.makeParticles('pixel');

        //Set the x and y speed of the particles betweeen -150 and 150
        // Speed will be randomly picked between -150 and 150 for each particle

        this.emitter.setYSpeed(-150, 150);
        this.emitter.setXSpeed(-150, 150);

        //Scale the particles from 2 times their size to 0 in 800ms
        //parameters are: startX, endX, startY, endY, duration

        this.emitter.setScale(2,0,2,0,800);

        this.emitter.gravity = 0;

        this.game.camera.follow(this.player);

        var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(togglePause,this);

        function togglePause() {


          this.game.physics.arcade.isPaused = (this.game.physics.arcade.isPaused) ? false : true;
          /*menu */
          this.game.stage.backgroundColor = (this.game.physics.arcade.isPaused) ? '#3498db':'#DDDDDD';
          this.game.stage.backgroundColor = (this.game.physics.arcade.isPaused) ? this.music.pause(): this.music.resume();
          this.game.stage.smoothed = false;
         
        }

    },

    update: function() {
	
        // Tell phaser that the player and the walls should collide
       this.game.physics.arcade.collide(this.player, this.layer);// should always be the first thing in our update function

        //call takecoin each time the player and a coin overlap, so we can add this in the update function

        // what two things collide and the function thats called back
        this.game.physics.arcade.overlap(this.player, this.coin, this.takeCoin, null, this);
	console.log(this.player.animations);
        //Make enemies and walls collide
        this.game.physics.arcade.collide(this.enemies, this.layer);

        //call the 'playerDie' function when the player and an enemy overlap

        this.game.physics.arcade.overlap(this.player, this.enemies, this.playerDie, null, this);

	//this.movePlayer();







        //If player is dead do nothing
        if(!this.player.alive){
            return;
        }

       


         //checks to see is player is inside the game world: If player is NOT in the gameworld, the game calls a function that resets the entire game
        if(!this.player.inWorld) {
            this.playerDie();
        }
	try{
	  this.movePlayer();
	}catch(e){
	  console.log(":( -- " + e );
	}

    },

    /*togglePause: function(){

      game.physics.arcade.isPaused = (game.physics.arcade.isPaused) ? false : true;

    },*/

    addMobileInputs: function(){
        var jumpButton = this.game.add.sprite(350, 240, 'jumpButton');
        jumpButton.fixedToCamera = true;
        jumpButton.inputEnabled = true;
        jumpButton.alpha = 0.5;
        jumpButton.events.onInputDown.add(this.jumpPlayer, this);
        
        //declare our movement variables
        this.moveLeft = false;
        this.moveRight = false;
        //add move left button
        var leftButton = this.game.add.sprite(50, 240, 'leftButton');
        leftButton.fixedToCamera = true;
        leftButton.inputEnabled = true;
        leftButton.alpha = 0.5;
        leftButton.events.onInputOver.add(this.setLeftTrue, this);
        leftButton.events.onInputOut.add(this.setLeftFalse, this);
        leftButton.events.onInputDown.add(this.setLeftTrue, this);
        leftButton.events.onInputUp.add(this.setLeftFalse, this);
        //add move right button
        var rightButton = this.game.add.sprite(130, 240, 'rightButton');
        rightButton.fixedToCamera = true;
        rightButton.inputEnabled = true;
        rightButton.alpha = 0.5;
        rightButton.events.onInputOver.add(this.setRightTrue, this);
        rightButton.events.onInputOut.add(this.setRightFalse, this);
        rightButton.events.onInputDown.add(this.setRightTrue, this);
        rightButton.events.onInputUp.add(this.setRightFalse, this);

    },

    setLeftTrue: function(){
        this.moveLeft = true;
    },

    setLeftFalse: function(){
        this.moveLeft = false;
    },

    setRightTrue: function(){
        this.moveRight = true;
    },

    setRightFalse: function(){
        this.moveRight = false;
    },

    jumpPlayer : function(){
        if(this.player.body.onFloor()){
            //Jump with sound
            this.player.body.velocity.y = -320;
            this.jumpSound.play();
        }
    },

    movePlayer: function() {
      if(!this.game.physics.arcade.isPaused){
        if (this.cursor.left.isDown || this.moveLeft) {
            this.player.body.velocity.x = -200;
            this.player.animations.play('left');
        }
        else if (this.cursor.right.isDown || this.moveRight) {
            this.player.body.velocity.x = 200;
            this.player.animations.play('right');
        }

        else {
            this.player.body.velocity.x = 0;
            this.player.animations.stop(); // stops animations
            this.player.frame = 0; //Change frame (stand still)
        }

        if (this.cursor.up.isDown && this.player.body.onFloor()) {
            /*this.jumpSound.play();
            this.player.body.velocity.y = -320;*/
            this.jumpPlayer();
        }
      }

    },



    createWorld: function() {

        //create the tilemap
        this.map = this.game.add.tilemap('map');

        //add the tileset to the map
        this.map.addTilesetImage('tileset');

        //create the layer by specifying the name of the tiled layer

        this.layer = this.map.createLayer('Tile Layer 1');

        //Set the world size to match the size of the layer
        this.layer.resizeWorld();

        //Enable collisions for the first tilset element (the blue wall)
        this.map.setCollision(1);
        this.map.setTileIndexCallback(2, this.moveOn,this);
        //this allows the grey tile to have a collision but the red tile to be see through

    },

    playerDie: function() {

        this.player.kill();



         // play dead sound
        this.deadSound.play();

        //set the position of the emitter on top of the player
        this.emitter.x = this.player.x;
        this.emitter.y = this.player.y;

        // start the emitter by exploding 15 particles that will live 800ms
        this.music.fadeOut();
        this.emitter.start(true, 800, null, 15);




        //calls the start menu function
        this.game.time.events.add(1000, this.startMenu,this);
          //Flash the color white for 300ms

        this.game.camera.shake(0.02, 300);

	

   /*$.ajax({


        type: 'POST',
        url: '/',
        data: send_score,
        success: function(data){

           console.log('success!');
           console.log(send_score);
           //location.reload();

        }

       });*/

    },

    startMenu: function(){


        this.game.state.start('menu');
        
    },

    takeCoin: function() {
        //kill the coin and make it dissapear from the game
       // this.coin.kill(); *** We no longer use this after 3.4 ***

        //increase the score by 5
        this.game.global.score += 5;

        //the coin sound
        this.coinSound.play();

        //update the score label by using its text property
        this.scoreLabel.text = 'score: ' + this.game.global.score;

        //change coin position at the end of 3.4
        this.updateCoinPosition();
        //set coin to 0 to make it invisible

        this.coin.scale.setTo(0,0);

        //grow the coin back to its original scale in 300ms
        this.game.add.tween(this.coin.scale).to({x: 1, y: 1}, 300).start();

        //see player grow for a short amount of time
         this.game.add.tween(this.player.scale).to({x: 1.8, y: 1.8}, 100).yoyo(true).start();

         //this.music.fadeOut(1000); 
         this.game.time.events.add(1000, this.moveOn , this);
         
    },

    moveOn: function(){
	console.log(this);
	//this.music.stop();
	//this.level2();
	this.music.fadeOut();
		
	setTimeout(this.level2, 3001, this); 		
	
	//this.music.onDecoded.add(level2,this); 

    },
    nothing: function(){
	return;

    },

    level2: function(meow){
      	console.log(meow); 
        meow.game.state.start('play2');
    },

    updateCoinPosition: function() {

        var coinPosition = [
            {x: 140, y: 60}, {x: 360, y: 60}, //top row
            {x: 60, y: 140}, {x:440, y: 140}, //middle row
            {x: 130, y: 300}, {x: 370, y: 300}
        ];

        // Remove the current coin position from the array (the place its on in the game screen)
        // Otherwise the coin could appear at the same spot twice in a row

        for(var i = 0; i < coinPosition.length; i++){
            if(coinPosition[i].x == this.coin.x) {
                coinPosition.splice(i,1);
            }
        }

        // Randomly select a position from the array with game.rnd.pick
        var newPosition = this.game.rnd.pick(coinPosition);

        // Set the new position of the coin
        this.coin.reset(newPosition.x, newPosition.y);

    },

    addEnemy: function() {
        //Get the first dead enemy of the group
        var enemy = this.enemies.getFirstDead();

        //If there isnt any dead enemy, do nothing
        if(!enemy){
            return;
        }

        //Initialize the enemy/make enemy appear falling from the top hole

        // Set the anchor point centered at the bottom
        enemy.anchor.setTo(0.5, 1);
        //Put the enemy above the top hole
        enemy.reset(game.width/2,0);
        //Add gravity to see it fall
        enemy.body.gravity.y = 500;
        //make enemy randomly move either right or left (100 or -100)
        enemy.body.velocity.x = 100 * this.game.rnd.pick([-1,1]);
        //bounce property allows enemey to move in the opposite direction when it hits a wall
        enemy.body.bounce.x = 1;
        // kills the sprite when it is no longer in the world This way we never run  out of enemies for getFirstDead
        enemy.checkWorldBounds = true;
        enemy.outOfBoundsKill = true;



    },




};

export default play;
