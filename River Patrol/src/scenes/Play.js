class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    //private sampleSound: Phaser.sound;

    create() {
        //this.add.text(20, 20, "Rocket Patrol Play");
        //river background
        //this.add.rectangle(0, game.config.height, game.config.width, borderUISize * 2, 0x0000FF).setOrigin(0, 0);

        // place tile sprite
        //this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'river').setOrigin(0, 0);
        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding- 10, game.config.width, borderUISize * 2, 0x5CED73).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

        //generates a random value, either 1 or -1, to determine unit direction
        this.random1 = Math.floor(Math.random() * 2) * 2 - 1;
        this.random2 = Math.floor(Math.random() * 2) * 2 - 1;
        this.random3 = Math.floor(Math.random() * 2) * 2 - 1;
        this.random4 = Math.floor(Math.random() * 2) * 2 - 1;
        //console.log(this.random1 + " " + this.random2 + " " + this.random3);

        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4 + 30, 'spaceship', 0, 30, this.random1).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2 + 30, 'spaceship', 0, 20, this.random2).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4 + 30, 'spaceship', 0, 10, this.random3).setOrigin(0,0);
        this.ship04 = new Angel(this, game.config.width - borderUISize*3, borderUISize*4, 'spaceship', 0, 60, this.random4).setOrigin(0,0);
        this.ship04.setSize(40,20);  //makes the angel hitbox smaller

        //changed to allocate new animation
        //this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, null, 0, 30).setOrigin(0, 0)
        //this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'rocket', 0, 20).setOrigin(0,0)
        //this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'rocket', 0, 10).setOrigin(0,0)

        // define keys
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // initialize score
        this.p1Score = 0
        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#B5651D',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        let baseConfig = {
            fontFamily: 'Courier',
            fontSize: '14px',
            align: 'middle',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100,
            color: "#006400",
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        this.scoretext = this.add.text(borderUISize + borderPadding, borderUISize, "Score", baseConfig)


        //display highscore
        if(game.settings.hardmode){
            this.highScore = this.add.text(borderUISize + borderPadding + 150, borderUISize + borderPadding*2, game.highscorehard, scoreConfig);
        }
        else{
            this.highScore = this.add.text(borderUISize + borderPadding + 150, borderUISize + borderPadding*2, game.highscoreeasy, scoreConfig);
        }
        this.highscoretext = this.add.text(borderUISize + borderPadding + 150, borderUISize, "High Score", baseConfig)

        // display time left
        let timeConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#B5651D',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.timeLeft = this.add.text(500, borderUISize + borderPadding*2, this.p1Score, timeConfig);
        this.clocktime = game.settings.gameTimer/1000;
        this.clockRunning = false;
        this.timetext = this.add.text(500, borderUISize, "Time", baseConfig)
        

        // GAME OVER flag
        this.gameOver = false

        //starts music 
        this.music = this.sound.add('music');
        this.music.loop = true;
        this.music.play();
        //console.log('mute: ', this.sound.mute);

        // 60-second play clock
        scoreConfig.fixedWidth = 0
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5)
            this.gameOver = true
            this.music.stop();
        }, null, this);

        //creates animations for figures
        this.ship01.visible = false;
        this.devil1 = this.add.sprite(this.ship01.x, this.ship01.y, 'angeldevil').setOrigin(0, 0);
        this.devil1.anims.play('devil')   
        if(this.random1 == -1){
            this.devil1.setFlip(true, false);
        } 
        
        this.ship02.visible = false;
        this.devil2 = this.add.sprite(this.ship02.x, this.ship02.y, 'angeldevil').setOrigin(0, 0);
        this.devil2.anims.play('devil')
        if(this.random2 == -1){
            this.devil2.setFlip(true, false);
        }    

        this.ship03.visible = false;
        this.devil3 = this.add.sprite(this.ship03.x, this.ship03.y, 'angeldevil').setOrigin(0, 0);
        this.devil3.anims.play('devil')
        if(this.random3 == -1){
            this.devil3.setFlip(true, false);
        }    

        this.ship04.visible = false;
        this.angel = this.add.sprite(this.ship04.x, this.ship04.y, 'angeldevil').setOrigin(0, 0);
        this.angel.anims.play('angel')
        if(this.random4 == -1){
            this.angel.setFlip(true, false);
        } 

      }


    update() {

        this.devil1.x = this.ship01.x
        this.devil1.y = this.ship01.y
        this.devil2.x = this.ship02.x
        this.devil2.y = this.ship02.y
        this.devil3.x = this.ship03.x
        this.devil3.y = this.ship03.y
        this.angel.x = this.ship04.x
        this.angel.y = this.ship04.y

        //updates high score
        //console.log("hardmode is: " + game.settings.hardmode);
        //console.log("hardscore is: " + game.highscorehard);
        //console.log("easyscore is: " + game.highscorehard);
        if(game.settings.hardmode){
            this.highScore.text = game.highscorehard;
            if(game.highscorehard < this.p1Score){
            
                game.highscorehard = this.p1Score
            }
        }
        else{
            this.highScore.text = game.highscoreeasy;
            if(game.highscoreeasy < this.p1Score){
            
                game.highscoreeasy = this.p1Score
            }
        }

        if(!this.clockRunning){
            this.clockRunning = true;
            this.updateClock();
        }
        // check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.clockRunning = false;
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
            this.clockRunning = false;
        }
        this.starfield.tilePositionX -= 4;
        this.p1Rocket.update();

        //this.ship01.update();               // update spaceships (x3)
        //this.ship02.update();
        //this.ship03.update();
        if(!this.gameOver) {               
            this.p1Rocket.update()         // update rocket sprite
            this.ship01.update()           // update spaceships (x3)
            this.ship02.update()
            this.ship03.update()
            this.ship04.update()
        } 

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            //console.log('kaboom ship 03')
            this.p1Rocket.reset();
            //this.ship03.reset();
            this.shipExplode(this.ship03);
            this.devil3.visible = false;
            this.time.delayedCall(400, () => {
                this.devil3.visible = true;
            }, null, this);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            //console.log('kaboom ship 02')
            this.p1Rocket.reset();
            //this.ship02.reset();
            this.shipExplode(this.ship02);
            this.devil2.visible = false;
            this.time.delayedCall(400, () => {
                this.devil2.visible = true;
            }, null, this);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            //console.log('kaboom ship 01')
            this.p1Rocket.reset();
            //this.ship01.reset();
            this.shipExplode(this.ship01);
            this.devil1.visible = false;
            this.time.delayedCall(400, () => {
                this.devil1.visible = true;
            }, null, this);
        }
        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship04)) {
            //console.log('kaboom ship 03')
            this.p1Rocket.reset();
            //this.ship03.reset();
            this.shipExplode(this.ship04);
            this.angel.visible = false;
            this.time.delayedCall(400, () => {
                this.angel.visible = true;
            }, null, this);
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
          rocket.x + rocket.width > ship.x && 
          rocket.y < ship.y + ship.height &&
          rocket.height + rocket.y > ship. y) {
          return true
        } else {
          return false
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode')             // play explode animation
        boom.on('animationcomplete', () => {   // callback after anim completes
          ship.reset()                         // reset ship position
          ship.alpha = 1                       // make ship visible again
          boom.destroy()                       // remove explosion sprite
        });
        // score add and text update
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score  ;
        
        this.sound.play('sfx-explosion');

        //increases time for explosion
      }

    updateClock(){
        if(this.clocktime > 0){
            this.clocktime = this.clocktime - 1;
        }
        //console.log("clock is: " + this.clocktime);
        this.timeLeft.text = this.clocktime;
        //updates clock text again in one second
        if(!this.gameOver){
            this.time.delayedCall(1000, () => {
                this.updateClock();
            }, null, this);
        }
        
    }
}