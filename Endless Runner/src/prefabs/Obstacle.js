class Obstacle extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, ground) {
      super(scene, x, y, texture, frame);
      
      this.scrollSpeed = 200;

      //where to teleport ground if it goes too far 
      this.startingx = game.config.width + ground.sprite.body.width + 130;
      this.startingy = 2*game.config.height/3 + 50;
      this.endingx = -game.config.width/5;

      this.sprite = scene.physics.add.sprite(x, y, 'spaceship').setOrigin(0, 0);
      this.sprite.tint = 0xFF0000;
      this.sprite.setImmovable();
    

      this.scene.obstacles.add(this.sprite);
      this.scene.obstaclearr.push(this);

      //ends game if runner collides with obstacle 
      scene.physics.add.collider(this.sprite, scene.runner.sprite, (sprite, runner) => {
        //console.log("Player hit obstacle, game over");
        scene.time = false;
        //AddListen(scene);
      });

      //scene.physics.add.collider(scene.grounds, this.sprite);

      this.ground = ground;
    }

    update(){
        this.sprite.body.velocity.x = - this.ground.scrollSpeed;

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

        //console.log("ground position is: " + this.sprite.body.x)
        //this.x = this.sprite.x;
    }
    
    
}