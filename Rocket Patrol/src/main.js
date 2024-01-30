/*
My Name: Chase Croy-Perrett


Mod Title: River Patrol : Rise of the Bears


The Mods I Used:


1 point: Add your own (copyright-free) looping background music to the Play scene. Added a copyright-free funky, fishing song!



1 point: Track a high score that persists across scenes and display it in the UI. 
High score is displayed adjacent to the current score. Each mode has it's own seperatley tracked high score.
*/

//console.log("hello world! :D");
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}


let game = new Phaser.Game(config);

// reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT;

// set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3