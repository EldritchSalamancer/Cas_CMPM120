/*
My Name: Chase Croy-Perrett


Mod Title: River Patrol : Rise of the Bears


Approximate Time: 8 hours


The Mods I Used:

1 point: Add your own (copyright-free) looping background music to the Play scene. Added a copyright-free funky, fishing song!

1 point: Allow the player to control the Rocket after it's fired

1 point: Randomize each spaceship's movement direction at the start of each play

1 point: Track a high score that persists across scenes and display it in the UI. 
High score is displayed adjacent to the current score. Each mode has it's own seperatley tracked high score.

1 point: Create a new scrolling tile sprite for the background (1)

1 point: Implement the speed increase that happens after 30 seconds in the original game (1)

3 points: Display the time remaining (in seconds) on the screen (3)
Time is displayed in the rightmost bar

3 points: Using a texture atlas, create a new animated sprite (three frames minimum) for the enemy spaceships (3)
I made the main spaceships an evil infernal bear!

3 points: Create a new title screen (e.g., new artwork, typography, layout) (3)
Now includes plot!

5 points: Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (5)
I made the new small spaceship a cute angelic bunny!

Total: 20 points
*/

//console.log("hello world! :D");
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    //scene: [ Menu, Play ]
    scene: [Play], //start in play for debugging

    physics: {
        default: 'arcade',
        arcade: {
          debug: true
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