class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load images/tile sprites
        /*this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('river', './assets/River.png');
        this.load.image('start', './assets/Titlescreen.png');

        // load explosion spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        });*/
      }

    create() {
        // animation configuration
        /*this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });*/
        
        //this.add.text(20, 20, "Rocket Patrol Menu");
        //this.scene.start("playScene");

        //display menu text
        /*this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL',
        menuConfig).setOrigin(0.5);*/
    }

    // define keys
    //keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    //keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    update() {
      //console.log("sound mute is: " + this.sound.mute);
           /* if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
              // easy mode
              game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000,
                hardmode: false
              }
              this.sound.play('sfx-select')
              this.scene.start('playScene')    
            }
            if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
              // hard mode
              game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000,
                hardmode: true
              }
              this.sound.play('sfx-select')
              this.scene.start('playScene')    
            }*/
    }
}