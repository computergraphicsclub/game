import game from "./index"

var boot = {
    
    preload: function (){
        //Load the image
	console.log("I work");
        this.game.load.image('progressBar', '/public/assets/progressBar.png');
    },
    
    create: function (){
        this.game.stage.backgroundColor = '#3498db';
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.renderer.renderSession.roundPixels =true;
        
        if(!this.game.device.desktop){
            //set the type of scalinig to 'show all'
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

            //set the min and max width height of the game
            this.game.scale.setMinMax(this.game.width/2, this.game.height/2, this.game.width*2,this.game.height*2);

            //center the game on the screen
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;

            //add blue color to hide potential white borders
            document.body.style.backgroundColor = '#3498db';
        }


        //start the load state
        this.game.state.start('load');
    }
    
    
    
}
export default boot;
