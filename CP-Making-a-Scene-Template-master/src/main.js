// Code Practice: Making a Scene
// Name: Chase Croy-Perrett
// Date: January 17th 2024

"use strict"

let config = {
    type: Phaser.AUTO,
    render:{
        pixelArt: true
    }, 
    scene: [MainMenu, Play] //Main menu is played first 

};

let game = new Phaser.Game(config);