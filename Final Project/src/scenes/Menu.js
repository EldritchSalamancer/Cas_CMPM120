class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {

        this.load.image('title', './assets/images/Title Screen.png');
        this.load.audio('select', './assets/sounds/Select.flac');
        this.load.audio('pew', './assets/sounds/Laser.wav');
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.load.audio('shopmusic', './assets/sounds/ShortElevator.wav');
        this.load.audio('gamemusic', './assets/sounds/Music.wav');
        this.load.audio('zap', './assets/sounds/zap.wav');
        this.load.audio('cash', './assets/sounds/CashRegister.wav');
        this.load.audio('spook', './assets/sounds/ghost.wav');
        this.load.audio('laugh', './assets/sounds/EvilLaugh.ogg');
        this.load.image('background', './assets/images/Store.png');
        this.load.image('laser', './assets/images/Laser.png');
        this.load.image('ghost', './assets/images/Ghost.png');
        this.load.image('hud', './assets/images/HUD.png');
        this.load.spritesheet('shopghost', './assets/images/ShopGhost.png', {
            frameWidth: 151,
            frameHeight: 300,
            startFrame: 0,
            endFrame: 2
        });
        this.load.spritesheet('hats', './assets/images/Hats.png', {
          frameWidth: 20,
          frameHeight: 20,
          startFrame: 0,
          endFrame: 7
      });


        this.load.spritesheet('shopbutton', './assets/images/ShopButton.png', {
            frameWidth: 79,
            frameHeight: 40,
            startFrame: 0,
            endFrame: 1
          });

          this.load.spritesheet('buster', './assets/images/Buster.png', {
            frameWidth: 21,
            frameHeight: 30,
            startFrame: 0,
            endFrame: 3
          });

        /*this.load.image('spaceship', './assets/spaceship.png');
        //this.load.image('spikes', './assets/Spikes.png');
        
        this.load.spritesheet('arrows', './assets/Holy Arrow.png', {
            frameWidth: 151,
            frameHeight: 300,
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

        this.txtcheck = false;*/
        //defines input
        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
      }


    create() {
        this.laugh = this.sound.add('laugh', {volume: 0.2});
        this.laugh.play();
        this.title = this.add.sprite(0, 0, 'title').setOrigin(0, 0);
        this.title.setScale(1);

        this.select = this.sound.add('select', {volume: 0.9});

        this.anims.create({
          key: 'hat0',
          frameRate: 8,
          repeat: -1,
          frames: this.anims.generateFrameNumbers('hats', {
              start: 0,
              end: 0
          })
        })
        this.anims.create({
          key: 'hat1',
          frameRate: 8,
          repeat: -1,
          frames: this.anims.generateFrameNumbers('hats', {
              start: 1,
              end: 1
          })
        })
        this.anims.create({
          key: 'hat2',
          frameRate: 8,
          repeat: -1,
          frames: this.anims.generateFrameNumbers('hats', {
              start: 2,
              end: 2
          })
        })
        this.anims.create({
          key: 'hat3',
          frameRate: 8,
          repeat: -1,
          frames: this.anims.generateFrameNumbers('hats', {
              start: 3,
              end: 3
          })
        })
        this.anims.create({
          key: 'hat4',
          frameRate: 8,
          repeat: -1,
          frames: this.anims.generateFrameNumbers('hats', {
              start: 4,
              end: 4
          })
        })
        this.anims.create({
          key: 'hat5',
          frameRate: 8,
          repeat: -1,
          frames: this.anims.generateFrameNumbers('hats', {
              start: 5,
              end: 5
          })
        })
        this.anims.create({
          key: 'hat6',
          frameRate: 8,
          repeat: -1,
          frames: this.anims.generateFrameNumbers('hats', {
              start: 6,
              end: 6
          })
        })
        this.anims.create({
          key: 'hat7',
          frameRate: 8,
          repeat: -1,
          frames: this.anims.generateFrameNumbers('hats', {
              start: 7,
              end: 7
          })
        })
        
    }


    update() {
      if(Phaser.Input.Keyboard.JustDown(keySPACE) || Phaser.Input.Keyboard.JustDown(keyENTER)){
        this.select.play();
        //this.scene.start("shopScene");
        this.scene.start("playScene");
      }
    }
}