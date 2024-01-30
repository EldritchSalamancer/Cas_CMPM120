class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
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
        });

        //devil spritesheet
        this.load.spritesheet('angeldevil', './assets/angel&devil.png', {
          frameWidth: 72,
          frameHeight: 32,
          startFrame: 0,
          endFrame: 7
        });

        // load audio
        this.load.audio('sfx-select', './assets/sfx-select.wav')
        this.load.audio('sfx-explosion', './assets/sfx-explosion.wav')
        this.load.audio('sfx-shot', './assets/sfx-shot.wav')
        this.load.audio('music', './assets/chill-music.mp3')

        //game highscore
        if(game.highscorehard == undefined || game.highscorehard == 0){
          game.highscorehard = 0;
        }
        if(game.highscoreeasy == undefined || game.highscoreeasy == 0){
          game.highscoreeasy = 0;
        }
      }

    create() {
        // animation configuration
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        this.anims.create({
          key: 'devil',
          frames: this.anims.generateFrameNumbers('angeldevil', { start: 4, end: 6, first: 4}),
           frameRate: 10,
           repeat: -1
        });

        this.anims.create({
          key: 'angel',
          frames: this.anims.generateFrameNumbers('angeldevil', { start: 0, end: 3, first: 0}),
           frameRate: 10,
           repeat: -1
        });

        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            //backgroundColor: "#F3B141",
            backgroundColor: "#F3B141",
            color: '#843605',
            align: 'right',
            padding:{
                top: 5,
                bottom: 5
            },
            fixedWidth: 0
        }

        
        //this.add.text(20, 20, "Rocket Patrol Menu");
        //this.scene.start("playScene");

        //display menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL',
        menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 , 'Use arrows (← →) to move & (F) to fire',
        menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = "#00FF00"
        menuConfig.color = "#000"
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert',
        menuConfig).setOrigin(0.5);

        this.title = this.add.sprite(-8, -3, 'start').setOrigin(0, 0);
        this.title.setScale(0.815);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        //keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
    }

    // define keys
    //keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    //keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    update() {
      //console.log("sound mute is: " + this.sound.mute);
            if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
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
            }
    }
}