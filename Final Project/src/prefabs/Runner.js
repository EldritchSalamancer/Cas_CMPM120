// Rocket prefab
class Runner extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
      
      this.playerspeed = 130;
      this.jumpheight = 400;
      this.sprite = scene.physics.add.sprite(2*game.config.width/7, 2*game.config.height/3 - 50, 'runners').setOrigin(0, 0);
      //this.sprite.anims.play('runner_run');
        
      this.sprite.tint = 0xFF69B4;
      this.sprite.scaleX = 0.8;
      this.sprite.collideWorldBounds = true;
      //this.runner.body.gravity.y = 10;
      this.sprite.setGravityY(700);
      this.sprite.body.setCollideWorldBounds(true);
      this.scene = scene;
    
      //scene.add.existing(this);

      this.isrunning = true;
      this.sprite.anims.play('runner_run');
      //this.isfalling = false;
      //this.isjumping = false;
    }

    update(){
        if(this.scene.gamegoing){
        
        if(this.sprite.body.velocity.y == 0 && this.isrunning == false){
            this.isrunning = true;
            this.sprite.anims.play('runner_run');
        }
        else if(this.sprite.body.velocity.y < 0){
            this.isrunning = false;
            this.sprite.anims.play('runner_fall');
        }
        else if(this.sprite.body.velocity.y > 0){
            this.isrunning = false; 
            this.sprite.anims.play('runner_jump');
        }

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
            this.scene.jump = this.scene.sound.add('jump');
            this.scene.jump.play();
        }
        else if (Phaser.Input.Keyboard.DownDuration(keyDOWN, 99999999)
        && Phaser.Input.Keyboard.DownDuration(keySPACE, 99999999) == false){ //fall down
            this.sprite.body.velocity.y += 30;
        }
        else if (Phaser.Input.Keyboard.JustDown(keySPACE)){ //jump
            //if we are on the ground, do a jump
            if(this.sprite.body.velocity.y == 0 || this.sprite.body.velocity.y == 30){
                this.sprite.body.velocity.y = -this.jumpheight;
                this.scene.jump = this.scene.sound.add('jump');
                this.scene.jump.play();
            }
            //if we have boosts stored, use them to do an air jump
            else if(this.scene.doublejumps > 0){
                this.scene.doublejumps -= 1;
                this.sprite.body.velocity.y = -this.jumpheight;
                this.scene.jump = this.scene.sound.add('jump');
                this.scene.jump.play();
            }
            
        }

        if (Phaser.Input.Keyboard.DownDuration(keyLEFT,  99999999)){
            vel -= this.playerspeed;
        }
        this.sprite.body.velocity.x = vel;
    }
    else{
        this.sprite.collideWorldBounds = false;
        this.sprite.angle = 90;
        //this.sprite.body.x = 400;
        //this.sprite.body.checkCollision.none = true;
    }
    
    }
  }