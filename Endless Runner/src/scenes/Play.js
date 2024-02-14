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
        this.gamegoing= true;
        this.time = 0;
    }
    //private sampleSound: Phaser.sound;

    create() {
        //variable to keep track of how many "grounds" have gone by
        this.scrollSpeed = 200;
        this.spawncount = 0;
        this.spawnrate = 4;
        this.survivorcount = 0;
        this.survivorrate = 6;
        this.spikerate = 5;
        this.pokerrate = 8;

        this.doublejumps = 0;
        this.doubletxt = this.add.text(0,20,"Boosts: " + this.doublejumps, { fontSize: 12 });
        this.survivorssaved = 0;
        this.survivortxt = this.add.text(0,0,"Survivors Saved: " + this.survivorssaved, { fontSize: 12 });
        this.wrathtxt = this.add.text(550,0,"Wrath: " + (this.scrollSpeed-200)/5, { fontSize: 12 });

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

            if(Phaser.Input.Keyboard.JustDown(keySPACE)){
                this.scene.restart();
            }
        }

    }

}

//function EndGame(scene){
    //scene.time = false;
    //scene.txt = scene.add.text(game.config.width/7,game.config.height/2,"Game Over, Press Space to restart", { fontSize: 22 });
    
//}