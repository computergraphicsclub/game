//Initalize phaser
//var game = new Phaser.Game(500, 340, Phaser.AUTO, 'gameDiv');
//for mobile

import boot from "./boot"
import load from "./load"
import menu from "./menu"
import play from "./play"
import play2 from "./play2"
var game = new Phaser.Game(1140,400,Phaser.Auto,"game");

//Define our global variable

game.global = {
    score: 0
};

//add all the states
/*boot = function(game){


};*/
/*boot.prototype = 
{preload: function(){},
create: function(){},
update: function(){}
};*/

/*var load  = function(game){


};
load.prototype = 
{preload: function(){},
create: function(){},
update: function(){}
};


var menu = function(game){


};
menu.prototype = 
{preload: function(){},
create: function(){},
update: function(){}
};*/






game.state.add('boot', boot);
game.state.add('load', load);
game.state.add('menu', menu);
game.state.add('play', play);
game.state.add('play2', play2);


//Start bootstate

game.state.start('boot');


