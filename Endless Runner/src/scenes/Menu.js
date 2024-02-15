class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {

      this.load.image('title', './assets/Title.png');
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('spikes', './assets/Spikes.png');
        
        this.load.spritesheet('arrows', './assets/Holy Arrow.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 1
          });

          this.load.spritesheet('survivors', './assets/SurvivorN.png', {
            frameWidth: 60,
            frameHeight: 60,
            startFrame: 0,
            endFrame: 1
          });
          this.load.spritesheet('runners', './assets/Runner.png', {
            frameWidth: 60,
            frameHeight: 60,
            startFrame: 0,
            endFrame: 5
          });
          this.load.spritesheet('angels', './assets/Angel.png', {
            frameWidth: 100,
            frameHeight: 100,
            startFrame: 0,
            endFrame: 5
          });
        this.load.image('checker', './assets/Checkerboard.png');
        this.load.image('checkers', './assets/Checkerboard Slant.png');
        this.load.image('stal', './assets/Stal.png');
        //this.load.image('spaceship', './assets/spaceship.png');

        this.load.audio('music', './assets/AlienMusic.wav')
        this.load.audio('jump', './assets/GameJump.wav')
        this.load.audio('hit', './assets/GameHit.wav')
        this.load.audio('laugh', './assets/EvilLaugh.mp3')
        this.load.audio('collect', './assets/Collect.wav')

        this.txtcheck = false;
        //defines input
        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
      }


    create() {
        this.title = this.add.sprite(0, 0, 'title').setOrigin(0, 0);
        this.title.setScale(1);
        
    }


    update() {
      if(Phaser.Input.Keyboard.JustDown(keySPACE)){
        this.scene.start("playScene");
    }
    }
}