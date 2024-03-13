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
let money = 300;
let bought = [false,false,false,false,false,false];

// reserve keyboard bindings
//let keyFIRE, keyRESET, keyLEFT, keyRIGHT, keySPACE;
let keySPACE, keyLEFT, keyRIGHT, keyDOWN, keyUP;
let keyW, keyA, keyS, keyD;

// set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3