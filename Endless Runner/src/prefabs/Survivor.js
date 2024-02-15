class Survivor extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, ground) {
      super(scene, x, y, texture, frame);
      //console.log("survivor created");
      this.scrollSpeed = 200;
      //console.log('made survivor');

      //where to teleport ground if it goes too far 
      this.startingx = game.config.width + ground.sprite.body.width + 130;
      this.startingy = 2*game.config.height/3 + 50;
      this.endingx = -game.config.width/5;

      this.sprite = scene.physics.add.sprite(x, y, 'survivors').setOrigin(0, 0);
      this.sprite.tint = 0xFFFF00;
      this.sprite.setImmovable();
      this.sprite.anims.play('survivor');
      this.sprite.scaleX = 1.4; this.sprite.scaleY = 1.4;
    

      this.scene.obstacles.add(this.sprite);
      this.scene.obstaclearr.push(this);

      //ends game if runner collides with obstacle 
      scene.physics.add.collider(this.sprite, scene.runner.sprite, (sprite, runner) => {
        //console.log("Player hit obstacle, game over");
        this.scene.survivorssaved += 1;
        if(this.scene.doublejumps < 4){
            this.scene.doublejumps += 1;
        }
        for(var i = 0; i < this.scene.obstaclearr.length; i++){
            if(this.scene.obstaclearr[i] == this){
                this.scene.obstaclearr.splice(i, 1);
                this.scene.collect = this.scene.sound.add('collect');
                this.scene.collect.play();
                break;
            }
        }
        //this.scene.obstaclearr.shift();
        this.sprite.body.enable = false;
        this.sprite.destroy();
        this.destroy();
      });

      //scene.physics.add.collider(scene.grounds, this.sprite);

      this.ground = ground;
    }

    update(){
        this.sprite.body.velocity.x = - this.scene.scrollSpeed;
        //console.log('running survivor');

        //destroy the obstacle if it moved off the screen
        if(this.sprite.body.x < this.endingx){
            for(var i = 0; i < this.scene.obstaclearr.length; i++){
                if(this.scene.obstaclearr[i] == this){
                    this.scene.obstaclearr.splice(i, 1);
                    break;
                }
            }
            //this.scene.obstaclearr.shift();
            this.sprite.body.enable = false;
            this.sprite.destroy();
            this.destroy();
        }

    }
    
}