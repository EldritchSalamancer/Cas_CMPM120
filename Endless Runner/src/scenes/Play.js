class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
        //console.log("Play is constructed");
    }

    preload(){
        //loads assets
        this.load.image('spaceship', './assets/spaceship.png');

        //defines input
        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    //private sampleSound: Phaser.sound;

    create() {
        //sets gravity of the world
        //this.setGravity(0,10);

        //adds runner
        this.runner = this.physics.add.sprite(2*game.config.width/7, 2*game.config.height/3, 'spaceship').setOrigin(0, 0);
        this.runner.tint = 0xFF69B4;
        this.runner.scaleX = 0.8;
        this.runner.collideWorldBounds = true;
        //this.runner.body.gravity.y = 10;
        this.runner.setGravityY(700);

        //adds ground
        this.ground = this.physics.add.sprite(0,  2*game.config.height/3 + 50, 'spaceship').setOrigin(0, 0);
        this.ground.tint = 0xFFFFFF;
        this.ground.scaleX = 4;
        this.ground.setImmovable();

        //makes ground & runner collide
        this.physics.add.collider(this.runner, this.ground);
    }
    update() {
        //console.log("Play is running");
        if (Phaser.Input.Keyboard.JustDown(keySPACE) 
        && this.checkCollision(this.runner, this.ground)){
            this.runner.body.velocity.y = -350;
        }
    }

}