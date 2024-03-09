class Spear extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, ground, type) {
      super(scene, x, y, texture, frame);
      
      this.scrollSpeed = 200;

      //where to teleport ground if it goes too far 
      this.startingx = game.config.width + ground.sprite.body.width + 130;
      this.startingy = 2*game.config.height/3 + 50;
      this.endingx = -game.config.width/5;

      this.sprite = scene.physics.add.sprite(x, y, 'arrows').setOrigin(0, 0);
      this.sprite.tint = 0xFF0000;
      this.sprite.setImmovable();
      this.sprite.anims.play('arrow');
    

      this.scene.obstacles.add(this.sprite);
      this.scene.obstaclearr.push(this);

      //ends game if runner collides with obstacle 
      scene.physics.add.collider(this.sprite, scene.runner.sprite, (sprite, runner) => {
        if(scene.gamegoing){
        scene.gamegoing = false;
        scene.txt = scene.add.text(game.config.width/7,game.config.height/2,"Game Over, Press Space to restart", { fontSize: 22 });
        this.scene.hit = this.scene.sound.add('hit');
        this.scene.hit.play();
        this.scene.laugh = this.scene.sound.add('laugh');
        this.scene.laugh.play();
        this.scene.runner.sprite.anims.play('runner_fall');
        this.scene.runner.sprite.collideWorldBounds = false;
        }
      });

      //scene.physics.add.collider(scene.grounds, this.sprite);

      this.ground = ground;
    }

    update(){
        this.sprite.body.velocity.x = - this.scene.scrollSpeed

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