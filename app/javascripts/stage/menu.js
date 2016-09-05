var menu = {
    
    create: function () {
        //Add a background image
        //this.game.add.image(this.game.width,-50, 'background');
        
        //display the name of the game
        
        var nameLabel = this.game.add.text(this.game.width/2, -50, 
                'Stages', { font: '50px Arial', fill: '#ffffff'}); // we need to set the location of the name label to -50 so the tween will be seen
        nameLabel.anchor.setTo(0.5, 0.5);
        
        //create a tween on the label
        var tween = this.game.add.tween(nameLabel);
        
        //change the y postiion of the label to 80 in  1000 ms
        tween.to({y: 80}, 1000);
        
        //start tween
        tween.start();
        
        //Show the score at the center of the screen
        
        var scoreLabel = this.game.add.text(this.game.width/2, this.game.height/2,
                'score: ' + this.game.global.score,
                { font: '25px Arial', fill: '#ffffff'});
        scoreLabel.anchor.setTo(0.5,0.5);
        
        //Explain how to start the game
        //Store the relevant text based on the device used
        var text;

        if(this.game.device.desktop){
            text = 'press the up arrow key to start';
        }
        else{
            text = 'touch the screen to start';
        }
        var startLabel = this.game.add.text(this.game.width/2, this.game.height-80,
            text,
            { font: '25px Arial', fill: '#ffffff'});
        startLabel.anchor.setTo(0.5, 0.5);
        
        var tween = this.game.add.tween(startLabel);
        
        //rotate the label to -2 degrees in 500ms
        tween.to({angle:-2}, 500);
        
        //then rotate the label to +2 degreees in 1000ms
        
        tween.to({angle: 2}, 1000);
        
        //and get back to our inital postion in 500ms
        tween.to({angle: 0}, 500);
        
        //loop indefinately the tween
        tween.loop();
        
        //start tween
        
        tween.start();
        
        //Create a new Phaser keyboard variable: the up arrow key
        //When pressed, call the 'start'
        if(!this.game.device.desktop){
            this.game.input.onDown.add(this.start, this);
        }
        var upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        upKey.onDown.add(this.start,this);
        
    },
    
    start: function () {
        
        //Start the actual game
        this.game.state.start('play');
    }
    
    
}

export default menu;
