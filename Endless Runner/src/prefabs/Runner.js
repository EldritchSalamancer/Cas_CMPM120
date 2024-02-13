// Rocket prefab
class Runner extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
      
      this.playerspeed = 130;
      this.jumpheight = 400;
      this.sprite = scene.physics.add.sprite(2*game.config.width/7, 2*game.config.height/3 - 50, 'spaceship').setOrigin(0, 0);
        
      this.sprite.tint = 0xFF69B4;
      this.sprite.scaleX = 0.8;
      this.sprite.collideWorldBounds = true;
      //this.runner.body.gravity.y = 10;
      this.sprite.setGravityY(700);
      this.sprite.body.setCollideWorldBounds(true);
    
      //scene.add.existing(this);
    }

    update(){

        var vel = 0;
        if (Phaser.Input.Keyboard.DownDuration(keyRIGHT, 99999999)){
            vel += this.playerspeed;
        }

        //jump/fall
        if(Phaser.Input.Keyboard.DownDuration(keyDOWN, 99999999)
        && Phaser.Input.Keyboard.JustDown(keySPACE) 
        && (this.sprite.body.velocity.y == 0 || this.sprite.body.velocity.y == 30)
        && Phaser.Input.Keyboard.DownDuration(keyLEFT,  99999999) == false){ //minihop
            //console.log("minihop activate"); 
            this.sprite.body.velocity.y = -this.jumpheight/1.4;
        }
        else if (Phaser.Input.Keyboard.DownDuration(keyDOWN, 99999999)
        && Phaser.Input.Keyboard.DownDuration(keySPACE, 99999999) == false){ //fall down
            this.sprite.body.velocity.y += 30;
        }
        else if (Phaser.Input.Keyboard.JustDown(keySPACE)  
        && (this.sprite.body.velocity.y == 0 || this.sprite.body.velocity.y == 30)){ //jump
            this.sprite.body.velocity.y = -this.jumpheight;
        }

        if (Phaser.Input.Keyboard.DownDuration(keyLEFT,  99999999)){
            vel -= this.playerspeed;
        }
        this.sprite.body.velocity.x = vel;
    
    }
  }