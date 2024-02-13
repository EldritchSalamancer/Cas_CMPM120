class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
        //console.log("Play is constructed");
    }

    preload(){
        //loads assets
        this.load.image('spaceship', './assets/spaceship.png');
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
        this.time = true;
    }
    //private sampleSound: Phaser.sound;

    create() {
        //variable to keep track of how many "grounds" have gone by
        this.spawncount = 0;
        this.spawnrate = 5;

        //adds runner
        this.runner = new Runner(this, 0, 2*game.config.height/3 + 50, 'spaceship', 0).setOrigin(0, 0);

        //adds ground to stand on
        this.stand = this.physics.add.sprite(0 , 2*game.config.height/3 + 42, 'spaceship').setOrigin(0, 0);
        //this.stand.tint = 0xA9A9A9; //stand visible
        this.stand.tint = 0x000000; //stand invisible
        this.stand.setImmovable();
        this.stand.scaleX = 11;
        this.stand.scaleY = 0.1;

        //adds looping ground
        //loops to make several instances of ground 
        this.grounds = this.add.group([this.runner.sprite]);
        this.groundarr = [];
        for(var i = 0; i < 7; i++){

            this.ground = this.physics.add.sprite(i * (1.081*game.config.width)/(5),  2*game.config.height/3 + 50, 'spaceship').setOrigin(0, 0);
            this.groundc = new Ground(this, 0, 2*game.config.height/3 + 50, 'spaceship', 0, this.ground).setOrigin(0, 0);
            this.ground.tint = 0xFFFFFF;
            this.ground.scaleX = game.config.width/(5 * this.ground.body.width);
            //this.ground.body.x += i * game.config.width/(5);
            //console.log("ground: " + i + " is at location " + this.ground.body.x);
            this.ground.setImmovable();
            this.grounds.add(this.ground);
            this.groundarr[i] = this.groundc;
            //this.physics.add.collider(this.runner, this.ground);

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

        //makes ground & runner collide
        this.physics.add.collider(this.runner.sprite, this.grounds);
        //this.physics.add.collider(this.runner.sprite, this.grounds);
        this.physics.add.collider(this.runner.sprite, this.stand);
        this.physics.add.collider(this.runner.sprite, this.wall);
    }
    update() {
        //only update if game is running
        //console.log("time is: " + this.time);
        if(this.time == true){

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

        }
        else{
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
        }

    }

}