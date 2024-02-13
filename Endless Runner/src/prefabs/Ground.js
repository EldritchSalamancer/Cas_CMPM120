//const { Phaser } = require("../../lib/phaser");

// Rocket prefab
class Ground extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, sprite) {
      super(scene, x, y, texture, frame);
      

      // add object to existing scene
      //scene.add.existing(this);
      this.scrollSpeed = 200;

    

      //where to teleport ground if it goes too far 
      this.startingx = game.config.width + sprite.body.width + 130;
      this.startingy = 2*game.config.height/3 + 50;
      this.endingx = -game.config.width/5;

      this.sprite = sprite;
      this.scene = scene;
    }

    update(){


        
        this.sprite.body.velocity.x = - this.scrollSpeed;

        if(this.sprite.body.x < this.endingx){
            this.reset();
        }
        this.x = this.sprite.body.x;
    
        
    }

    reset(){
        //moves back ground tracker to starting location
        this.sprite.body.x += this.startingx;

        //creates an obstacle on the next reset if spawnrate says its time
        this.scene.spawncount += 1;
        //console.log("Spawncount is: " + this.scene.spawncount);
        if(this.scene.spawncount >= this.scene.spawnrate){
            
            //generates random position for new obstacle
            var randrange = 100 - (Math.random() * 80);
            //generates a new obstacle
            var newobstacle = new Obstacle(this.scene, this.sprite.body.x, this.sprite.body.y - randrange, 'spaceship', 0, this).setOrigin(0, 0);
            this.scene.spawncount = 0;
            
        }
    }
}
  