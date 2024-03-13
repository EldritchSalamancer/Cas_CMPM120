class Shop extends Phaser.Scene {
    constructor() {
        super("shopScene");
        //console.log("Play is constructed");
    }

    preload(){
        //loads assets


          keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

        //this.load.image();
    }
    //private sampleSound: Phaser.sound;

    create() {
        this.music = this.sound.add('shopmusic', {volume: 0.2});
        this.music.loop = true;
        this.music.play();
        this.select = this.sound.add('select', {volume: 0.2});
        this.cash = this.sound.add('cash');

        this.runs += 1;

        this.store = this.physics.add.sprite(250,250, 'background');
        this.store.scaleX = 1.5; this.store.scaleY = 1.4;

        this.ghost = this.physics.add.sprite(350, 200, 'shopghost');
        this.ghost.scaleX = 1.3; this.ghost.scaleY = 1.3;

        this.textbox = new Phaser.GameObjects.Rectangle(this, config.width/2 - 170, config.height - 60, 100, 400, 0xFFFFFF);
        this.ghosttext = this.add.text(config.width/2 - 170,config.height - 60, "What do you want to buy?", 
        { fontSize: 22 , color: "black"});
        //this.ghost.frame = 0;

        this.anims.create({
            key: 'sel_button',
            frames: this.anims.generateFrameNumbers('shopbutton', { start: 1, end: 1, first: 1}),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'unsel_button',
            frames: this.anims.generateFrameNumbers('shopbutton', { start: 0, end: 0, first: 0}),
            frameRate: 4,
            repeat: -1
        });
        this.moneytxt = this.add.text(config.width - 120, 20, "Money: " + money, {color: "black"});
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


        let ghostTween = this.tweens.chain({
            targets: this.ghost,
            //ease: 'Bounce.easeOut',
            loop: 1,
            repeat: 1,
            paused: true,
            tweens: [
                {
                    y: 200 - 50,
                    duration: 4000, 
                    ease: 'Sine.easeOut',
                    onStart: () => {
                        
                    }
                },
                {
                    y: 200 + 100,
                    duration: 4000,
                    ease: 'Sine.easeOut',
                    onComplete: () => {
                        ghostTween.restart()
                    }
                }
            ]
        });
        ghostTween.restart()

        this.buttons = [];

        for(var i = 0; i < 7; i++){
            //var button = this.physics.add.sprite(60, -40 + 70 * (i+1), 'shopbutton');
            //button.frame = 0;
            //button.scaleX = 1.5; button.scaleY = 1.5;
            //button.anims.play('unsel_button');
            var button = new Button(this, 60, -40 + 70 * (i+1), 'shopbutton', 0 ,"$" + String(50 * (i+1)), 50 * (i+1)).setOrigin(0, 0)
            this.buttons.push(button);
        }
        //var button = new Button(this, config.width - 80, -config.height - 40, 'checkers', "Cost").setOrigin(0, 0)
        var button = new Button(this, config.width - 80, config.height - 40, 'shopbutton', 0,"Exit").setOrigin(0, 0)
        this.buttons.push(button);
        this.selection = this.buttons.length -1;

        

    }
    update() {
        for(var i = 0; i < this.buttons.length; i++){

            //changes what button is selected in the shop
            if(this.selection == i){
                this.buttons[i].sprite.anims.play('sel_button');
                //this.buttons[i].sprite.tint = 0xFFFFFF;
            }
            else{
                this.buttons[i].sprite.anims.play('unsel_button');
                //this.buttons[i].sprite.tint = 0xFFFFFF;
            }
        }

            if(Phaser.Input.Keyboard.JustDown(keyDOWN) && this.selection < this.buttons.length - 1){
                this.selection += 1;
                //this.buttons[this.selection].txt.tint = 0x004000;
                this.select.play();
                //console.log("selection is: " + this.selection);
            }
            else if(Phaser.Input.Keyboard.JustDown(keyUP) && this.selection > 0){
                this.selection -= 1;
                //this.buttons[this.selection].sprite.tint = 0x004000;
                this.select.play();
                //console.log("selection is: " + this.selection);
            }
            if(Phaser.Input.Keyboard.JustDown(keySPACE)){
                if(this.selection != this.buttons.length - 1 && this.buttons[this.selection].txt.text != "Sold!" ){
                    if(this.buttons[this.selection].cost <= money){
                        money -= this.buttons[this.selection].cost;
                        this.cash.play();
                        this.buttons[this.selection].sprite.tint = 0x004000;
                        this.buttons[this.selection].txt.text = "Sold!"
                    }
                }
                else if(this.buttons[this.selection].txt.text == "Exit"){
                    //this.select.play();
                    this.select.play();
                    this.music.stop();
                    this.scene.start("playScene");
                }
            }

            this.moneytxt.text = "Money: " + money;
        
    }
        

}

//function EndGame(scene){
    //scene.time = false;
    //scene.txt = scene.add.text(game.config.width/7,game.config.height/2,"Game Over, Press Space to restart", { fontSize: 22 });
    
//}