class Shop extends Phaser.Scene {
    constructor() {
        super("shopScene");
        //console.log("Play is constructed");
    }

    preload(){
        //loads assets
        this.load.image('checker', './assets/Checkerboard.png');
        this.load.image('checkers', './assets/Checkerboard Slant.png');
        this.load.image('stal', './assets/Stal.png');

        this.load.audio('shopmusic', './assets/sounds/ShortElevator.wav');

        this.load.spritesheet('shopghost', './assets/ShopGhost.png', {
            frameWidth: 151,
            frameHeight: 300,
            startFrame: 0,
            endFrame: 2
        });

        this.load.spritesheet('shopbutton', './assets/ShopButton.png', {
            frameWidth: 80,
            frameHeight: 40,
            startFrame: 0,
            endFrame: 1
          });

        //this.load.image();
    }
    //private sampleSound: Phaser.sound;

    create() {
        this.music = this.sound.add('shopmusic', {volume: 0.2});
        this.music.loop = true;
        this.music.play();

        this.runs += 1;

        this.ghost = this.add.sprite(400, 200, 'shopghost');
        //this.ghost.frame = 0;

        /*if(this.runs <= 1){
        this.anims.create({
            key: 'arrow',
            frames: this.anims.generateFrameNumbers('arrows', { start: 0, end: 1, first: 0}),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'shopidle',
            frames: this.anims.generateFrameNumbers('arrows', { start: 0, end: 2, first: 0}),
            frameRate: 4,
            repeat: -1
        });
        }*/

        this.buttons = [];

        for(var i = 0; i < 7; i++){
            var button = this.add.sprite(60, -40 + 70 * (i+1), 'shopbutton');
            //button.frame = 0;
            button.scaleX = 1.5; button.scaleY = 1.5;
            this.buttons.push(button);
        }

        

    }
    update() {

    }
        

}

//function EndGame(scene){
    //scene.time = false;
    //scene.txt = scene.add.text(game.config.width/7,game.config.height/2,"Game Over, Press Space to restart", { fontSize: 22 });
    
//}