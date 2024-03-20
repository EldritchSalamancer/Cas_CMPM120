class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {

        //input definitions
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        //loads
        this.load.image('title', './assets/images/Title Screen.png');
        this.load.audio('select', './assets/sounds/Select.flac');
        this.load.audio('pew', './assets/sounds/Laser.wav');
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
        this.load.image('controls', './assets/images/Controls.png');
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

          this.load.spritesheet('slime', './assets/tilemap/slime.png', {
            frameWidth: 16,
            frameHeight: 16
          });
465
          this.load.image('tilesetImage', './assets/tilemap/Tileset2.png');
          this.load.tilemapTiledJSON('tilemapJSON', "./assets/tilemap/tileset6.json");

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

        //hat variations
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

        // player animations
        this.anims.create({
          key: 'standr',
          frameRate: 8,
          repeat: -1,
          frames: this.anims.generateFrameNumbers('buster', {
              start: 0,
              end: 0
          })
      })
      this.anims.create({
          key: 'walkr',
          frameRate: 8,
          repeat: -1,
          frames: this.anims.generateFrameNumbers('buster', {
              start: 0,
              end: 1
          })
      })
      this.anims.create({
          key: 'standl',
          frameRate: 8,
          repeat: -1,
          frames: this.anims.generateFrameNumbers('buster', {
              start: 2,
              end: 2
          })
      })
      this.anims.create({
          key: 'walkl',
          frameRate: 8,
          repeat: -1,
          frames: this.anims.generateFrameNumbers('buster', {
              start: 2,
              end: 3
          })
      })

        this.controls = this.physics.add.sprite(config.width/2, config.height/2, 'controls');
        this.controls.scaleX = 0;
        this.select = this.sound.add('select', {volume: 0.2});
        
    }


    update() {

      //start game
      if(Phaser.Input.Keyboard.JustDown(keySPACE)){
        this.select.play();
        this.scene.start("playScene");
      }

      //controls
      else if(Phaser.Input.Keyboard.JustDown(keyENTER)){
        this.select.play();
        if(this.controls.scaleX == 0){
          this.controls.scaleX = 1;
        }
        else{
          this.controls.scaleX = 0;
        }
      }
    }
}