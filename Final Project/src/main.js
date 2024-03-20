/*
CREATOR
Chase Croy-Perrett
ccroyper

MAJOR COMPONENTS USED
text objects, tilemaps, timers, physics systems, animation manager, tween manager

REFERENCES
Short Elevator Music Loop: https://freesound.org/people/BlondPanda/sounds/659889/
Select: https://freesound.org/people/plasterbrain/sounds/396193/
Cash Register: https://freesound.org/people/CapsLok/sounds/184438/
Laser: https://freesound.org/people/mparsons99/sounds/89492/
Game Music: https://freesound.org/people/vibritherabjit123/sounds/642504/
Ghost: https://freesound.org/people/LittleRobotSoundFactory/sounds/316403/
Zap: https://freesound.org/people/cabled_mess/sounds/351000/
Evil Laugh: https://freesound.org/people/mrgreaper/sounds/223495/
*/

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scrollSpeed: 200,
    autoCenter: true,
    render: {
      pixelArt: true
    },
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
let hatcolor = 0xFFFFFF;
let hat = 0;
let spawnrate = 50;
let spawncount = 0;
let health = 5;

// reserve keyboard bindings
let keySPACE, keyLEFT, keyRIGHT, keyDOWN, keyUP, keyENTER;
let keyW, keyA, keyS, keyD;

// set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3