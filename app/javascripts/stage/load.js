var load = {
    
    preload: function() {
        // Add a ' loading .. ' label on the screen
        var loadingLabel = this.game.add.text(this.game.width/2, 150, 
                'loading..', {font: '30px Arial', fill: '#ffffff'});
        loadingLabel.anchor.setTo(0.5,0.5);
        
        //Display the progress bar
        
        var progressBar = this.game.add.sprite(this.game.width/2, 200, 
            'progressBar');
        this.game.load.setPreloadSprite(progressBar);
        
        //Load all our assets
        
        //this.game.load.image('player', '/public/assets/player.png');
        this.game.load.spritesheet('player','/public/images/player.png',20, 20);
        this.game.load.image('enemy', '/public/stage-assets/enemy.png');
        this.game.load.image('coin', '/public/stage-assets/coin.png');
        
        /*
        game.load.image('wallV', 'assets/wallVertical.png');
        game.load.image('wallH', 'assets/wallHorizontal.png');*/
        this.game.load.image('tileset', '/public/stage-assets/tileset.png');
        this.game.load.tilemap('map', '/public/stage-assets/mymap.json', null,Phaser.Tilemap.TILED_JSON);

        //Load level 2 

        this.game.load.tilemap('map2', '/public/stage-assets/map.json', null, Phaser.Tilemap.TILED_JSON);
        
        
        this.game.load.image('pixel','/public/stage-assets/pixel.png');
        
        //Sound when player jumps
        this.game.load.audio('jump', ['/public/stage-assets/jump.ogg', '/public/assets/jump.mp3']);
        this.game.load.audio('coin', ['/public/stage-assets/coin.ogg', '/public/assets/coin.mp3']);
        this.game.load.audio('dead', ['/public/stage-assets/dead.ogg', '/public/assets/dead.mp3']);

        this.game.load.audio('ost1', ['/public/stage-assets/ost1.mp3']);
        this.game.load.audio('ost2', ['/public/stage-assets/ost2.mp3']);
        
        //load new asset that will use in menu state
        //this.game.load.image('background', '/public/assets/background.png');

        //load touch buttons
        this.game.load.image('jumpButton', '/public/stage-assets/jumpButton.png');
        this.game.load.image('rightButton', '/public/stage-assets/rightButton.png');
        this.game.load.image('leftButton', '/public/stage-assets/leftButton.png');
    },
    
    create: function(){
        
        //Go to menu state
        this.game.state.start('menu');
    
    }
};

export default load;
