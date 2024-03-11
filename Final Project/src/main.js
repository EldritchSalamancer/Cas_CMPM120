/*
*/

//console.log("hello world! :D");
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scrollSpeed: 200,
    scene: [ Menu, Play, Shop ],
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
let keySPACE, keyLEFT, keyRIGHT, keyDOWN, keyUP;

// set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3