/*
My Name: Chase Croy-Perrett


Game Title: Defy Judgment


Approximate Time: 22 hours


Creative Tilt:
Hello! I am quite proud of this game I have made, both it's mechanics and its visual style. My art skills may not be the most
exemplary of the class, but I am proud that I was able to put together a cohesive theme (of the biblical judgment day) in a 
minimalistic style. My greatest artistic feat being the layered ground the player runs across, it's joint pieces creating
a three dimensional effect in the game. The music is also particularly fitting for the setting, the proper
combination of energatic and  for facing off a mind boggling end of the world senario.
The technically interesting feat I have achieved also has to do with dynamic grounding 
system I have used to control obstacle and pickup spawns. The type and number of obstacles will dynamically grow over time,
but may be overcome with the stored "bonus jumps" the player has collected. While the player may be limited to the standard move and jump
options, the ability to collect and store jumps for later use placed a long-term risk-assessment aspect of gameplay on top of 
the regular short term manuvering gameplay. The player may store a maximum of four additional bonus jumps at a time, each one for a
survivor rescued.

Total: 20 points
*/

//console.log("hello world! :D");
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scrollSpeed: 200,
    scene: [ Menu, Play ],
    //scene: [Play], //start in play for debugging

    physics: {
        default: 'arcade',
        arcade: {
          //debug: true
          debug: false
        }
    }
    
}


let game = new Phaser.Game(config);

// reserve keyboard bindings
//let keyFIRE, keyRESET, keyLEFT, keyRIGHT, keySPACE;
let keySPACE, keyLEFT, keyRIGHT, keyDOWN;

// set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3