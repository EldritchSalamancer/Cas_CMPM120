class Shop extends Phaser.Scene {
    constructor() {
        super("shopScene");
    }

    preload(){
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    }

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
        this.ghosttext = this.add.text(config.width/2 - 190,config.height - 60, "What do you want to buy?", 
        { fontSize: 12 , color: "black"});
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

        //tween to make ghost look like it is "floating"
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
            
            var hatc;
            var dialog;
            var cost;
            switch(i){
                case 0: hatc = 0xFF0000; cost = 50;  dialog="Simple Cap.\nYour Specterfighter uniform."; break;
                case 1: hatc = 0x00FF00; cost = 200;  dialog="Cute Cat Hat.\nAn artist would wear this."; break;
                case 2: hatc = 0x0000FF; cost = 400;  dialog="Spades Fedora.\nYou feel like a member of the midnight crew."; break;
                case 3: hatc = 0xFF00FF; cost = 1000;  dialog="Crowbar's Helmet.\nWon't protect from actual crowbars."; break;
                case 4: hatc = 0xFFFF00; cost = 2000;  dialog="Familiar Headband.\nFound in the Garbage."; break;
                case 5: hatc = 0xFF00FF; cost = 4000;  dialog="Tentacle Hair.\nOr is this a mop?"; break;
                case 6: hatc = 0x000000; cost = 9999;  dialog="Golden Crown.\nRadiates with respect."; break;

            }
            //var button = new Button(this, 60, -40 + 70 * (i+1), 'shopbutton', 0 ,"$" + String(50 * (i+1)), 50 * (i+1), hatc, i).setOrigin(0, 0)
            var button = new Button(this, 60, -40 + 70 * (i+1), 'shopbutton', 0 ,"$" + String(cost), cost, hatc, i).setOrigin(0, 0)
            button.dialog = dialog;
            this.buttons.push(button);
        }
        //var button = new Button(this, config.width - 80, -config.height - 40, 'checkers', "Cost").setOrigin(0, 0)
        var dialog = "I'm just kinda selling this stuff cause\nthe store owners ran off because of the ghost \ninvasion and all. What do you want to buy?";
        var button = new Button(this, config.width - 80, config.height - 40, 'shopbutton', 0,"Exit", undefined).setOrigin(0, 0)
        button.dialog = dialog;
        this.buttons.push(button);
        this.selection = this.buttons.length -1;

        

    }
    update() {
        for(var i = 0; i < this.buttons.length; i++){
            //changes what button is visually selected in the shop
            if(this.selection == i){
                this.buttons[i].sprite.anims.play('sel_button');
            }
            else{
                this.buttons[i].sprite.anims.play('unsel_button');
            }
        }

        //explores buttons
            if(Phaser.Input.Keyboard.JustDown(keyDOWN) && this.selection < this.buttons.length - 1){
                this.selection += 1;
                this.select.play();
                this.ghosttext.text = this.buttons[this.selection].dialog;
            }
            else if(Phaser.Input.Keyboard.JustDown(keyUP) && this.selection > 0){
                this.selection -= 1;
                this.select.play();
                this.ghosttext.text = this.buttons[this.selection].dialog;
            }

            //activates button
            if(Phaser.Input.Keyboard.JustDown(keySPACE)){
                if(this.selection != this.buttons.length - 1 && this.buttons[this.selection].txt.text != "Sold!" ){
                    if(this.buttons[this.selection].cost <= money){
                        money -= this.buttons[this.selection].cost;
                        this.cash.play();
                        this.buttons[this.selection].sprite.tint = 0x004000;
                        hatcolor = this.buttons[this.selection].color;
                        this.buttons[this.selection].txt.text = "Sold!"
                        hat = this.buttons[this.selection].i;
                    }
                }
                else if(this.buttons[this.selection].txt.text == "Exit"){
                    this.select.play();
                    this.music.stop();
                    this.scene.start("playScene");
                }
            }

            this.moneytxt.text = "Money: " + money;
        
    }
        

}
