class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
        //console.log("Play is constructed");
    }

    preload(){
        //loads assets
        this.runs = 0
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('spikes', './assets/Spikes.png');
        //this.load.image('arrows', './assets/Holy Arrow.png');
        /* // load explosion spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9

        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        });*/
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
        this.playerspeed = 150;
        this.jumpheight = 370;

        //decides if game is on
        this.gamegoing= true;
        this.time = 0;
    }
    //private sampleSound: Phaser.sound;

    create() {
        this.runs += 1;

        if(this.runs <= 1){
        this.anims.create({
            key: 'arrow',
            frames: this.anims.generateFrameNumbers('arrows', { start: 0, end: 1, first: 0}),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'survivor',
            frames: this.anims.generateFrameNumbers('survivors', { start: 0, end: 1, first: 0}),
            frameRate: 1.5,
            repeat: -1
        });
        this.anims.create({
            key: 'runner_run',
            frames: this.anims.generateFrameNumbers('runners', { start: 0, end: 3, first: 0}),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'runner_fall',
            frames: this.anims.generateFrameNumbers('runners', { start: 4, end: 4, first: 0}),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'runner_jump',
            frames: this.anims.generateFrameNumbers('runners', { start: 5, end: 5, first: 0}),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'angel',
            frames: this.anims.generateFrameNumbers('angels', { start: 0, end: 1, first: 0}),
            frameRate: 0.5,
            repeat: -1
        });
    }

        this.angel = this.physics.add.sprite(420,50, 'angel').setOrigin(0, 0);
        this.angel.scaleX = 2.5;
        this.angel.scaleY = 2.5;
        this.angel.anims.play('angel');

        //variable to keep track of how many "grounds" have gone by
        this.scrollSpeed = 200;
        this.spawncount = 0;
        this.spawnrate = 4;
        this.survivorcount = 0;
        this.survivorrate = 6;
        this.spikerate = 5;
        this.pokerrate = 9;

        this.doublejumps = 0;
        this.doubletxt = this.add.text(0,20,"Boosts: " + this.doublejumps, { fontSize: 12 });
        this.survivorssaved = 0;
        this.survivortxt = this.add.text(0,0,"Survivors Saved: " + this.survivorssaved, { fontSize: 12 });
        this.wrathtxt = this.add.text(550,0,"Wrath: " + (this.scrollSpeed-200)/5, { fontSize: 12 });

         //adds ground to stand on
         this.stand = this.physics.add.sprite(0 , 2*game.config.height/3 + 42, 'spaceship').setOrigin(0, 0);

        //acts background (untouchable) elements
        this.untoucharr = [];
        for(var i = 0; i < 7; i++){
            this.untouch = new Untouch(this, 1.12*i*game.config.width/(6), 2*game.config.height/3 + 30, 'checkers').setOrigin(0, 0);
            this.untouch.sprite.scaleX = 1.90
            this.untouch.sprite.scaleY = 0.7
        }


        //this.stand.tint = 0xA9A9A9; //stand visible
        this.stand.tint = 0x000000; //stand invisible
        this.stand.setImmovable();
        this.stand.scaleX = 11;
        this.stand.scaleY = 0.1;

        //adds looping ground
        //loops to make several instances of ground 
        this.grounds = this.add.group([]);
        this.groundarr = [];
        for(var i = 0; i < 7; i++){

            this.ground = this.physics.add.sprite(i * (1.11*game.config.width)/(5),  2*game.config.height/3 + 50, 'checker').setOrigin(0, 0);
            //this.ground.body.scaleX = 6.6
            this.groundc = new Ground(this, 0, 2*game.config.height/3 + 50, 'spaceship', 0, this.ground).setOrigin(0, 0);
            this.ground.tint = 0xFFFFFF;
            this.ground.scaleX = 1.8;//game.config.width/(5 * this.ground.body.width);
            this.ground.scaleY = 1.4;
            this.ground.setImmovable();
            this.grounds.add(this.ground);
            this.groundarr[i] = this.groundc;
            

        }


        this.obstacles = this.add.group([]);
        this.obstaclearr = [];

        //adds invisible wall to limit player movement
        this.wall = this.physics.add.sprite(game.config.width/2 + 30, 0, 'spaceship').setOrigin(0, 0);
        this.wall.scaleX = 0.2;
        this.wall.scaleY = 20;
        this.wall.tint = 0xFFFFFF;
        this.wall.visible = false;
        this.wall.setImmovable();

        //adds runner
        this.runner = new Runner(this, 0, 2*game.config.height/3 + 50, 'spaceship', 0).setOrigin(0, 0);

        //makes ground & runner collide
        this.physics.add.collider(this.runner.sprite, this.grounds);
        //this.physics.add.collider(this.runner.sprite, this.grounds);
        this.physics.add.collider(this.runner.sprite, this.stand);
        this.physics.add.collider(this.runner.sprite, this.wall);

        this.music = this.sound.add('music', {volume: 0.2});
        this.music.loop = true;
        this.music.play();
    }
    update() {
        //console.log("gamescrollspeed is: " + this.scrollSpeed);
        

        //only update if game is running
        //console.log("time is: " + this.time);
        this.doubletxt.text = "Boosts: " + this.doublejumps;
        this.survivortxt.text = "Survivors Saved: " + this.survivorssaved;
        this.wrathtxt.text = "Wrath: " + (this.scrollSpeed/200);

        if(this.gamegoing == true){

            //updates runner
            this.runner.update();
            //updates moving ground
            for(var i = 0; i < 6; i++){
             this.groundarr[i].update();
            }
            //updates obstacles
            for(var i = 0; i < this.obstaclearr.length; i++){
                this.obstaclearr[i].update();
            }
            //updates obstacles
            for(var i = 0; i < this.untoucharr.length; i++){
                this.untoucharr[i].update();
            }

        }
        else{
            this.music.stop();
            this.runner.update();
            //updates runner
            this.runner.sprite.body.velocity.x = 0;
            //updates moving ground
            for(var i = 0; i < 6; i++){
             this.groundarr[i].sprite.body.velocity.x = 0;
            }
            //updates obstacles
            for(var i = 0; i < this.obstaclearr.length; i++){
                this.obstaclearr[i].sprite.body.velocity.x = 0;
            }

            if(Phaser.Input.Keyboard.JustDown(keySPACE)){
                this.scene.restart();
            }
            for(var i = 0; i < this.untoucharr.length; i++){
                this.untoucharr[i].sprite.body.velocity.x = 0;
            }
        }

    }

}

//function EndGame(scene){
    //scene.time = false;
    //scene.txt = scene.add.text(game.config.width/7,game.config.height/2,"Game Over, Press Space to restart", { fontSize: 22 });
    
//}