//const { Phaser } = require("../../lib/phaser");

// Rocket prefab
class Ground extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, sprite) {
      super(scene, x, y, texture, frame);
      

      // add object to existing scene
      //scene.add.existing(this);
      //this.scrollSpeed = 200;

    

      //where to teleport ground if it goes too far 
      this.startingx = game.config.width + sprite.body.width + 130;
      this.startingy = 2*game.config.height/3 + 50;
      this.endingx = -game.config.width/5;

      this.sprite = sprite;
      this.sprite.scaleX = 20
      this.scene = scene;
    }

    update(){


        
        this.sprite.body.velocity.x = - this.scene.scrollSpeed;

        if(this.sprite.body.x < this.endingx){
            this.reset();
        }
        this.x = this.sprite.body.x;
    
        
    }

    reset(){
        //moves back ground tracker to starting location
        this.sprite.body.x += this.startingx;
        this.scene.time += 1;
        //creates an obstacle on the next reset if spawnrate says its time
        this.scene.spawncount += 1;
        this.scene.survivorcount += 1;
        //console.log("Spawns Spawncount is: " + this.scene.spawncount + ", Survivorcount is: " + this.scene.survivorcount);
        
        //spawns spears
        var spearrandrange;
        if(this.scene.spawncount >= this.scene.spawnrate){
            
            //generates random position for new obstacle
            spearrandrange = 40 + Math.floor(Math.random() * 10) * 20;
            //generates a new obstacle
            var newobstacle = new Spear(this.scene, this.sprite.body.x, this.sprite.body.y - spearrandrange, 'spaceship', 0, this).setOrigin(0, 0);
            this.scene.spawncount = 0;
            if(this.scene.time > 160){
                var randrange2 = 40 + Math.floor(Math.random() * 10) * 25;
                var newobst = new Spear(this.scene, this.sprite.body.x + this.sprite.body.width, this.sprite.body.y - randrange2, 'spaceship', 0, this).setOrigin(0, 0);
            }
            
        }
        
        //spawns survivors
        if(this.scene.survivorcount >= this.scene.survivorrate){
            //console.log("Spawns Survivor");
            //console.log("Spawns Spawncount is: " + this.scene.spawncount + ", Survivorcount is: " + this.scene.survivorcount);
            //generates random position for new obstacle
            //if(this.scene.spawncount != 0){ //doesnt spawn a survivor on the same space as a spear
                //while(true){
                var randrange = 80 + (Math.random() * 120);
                if(randrange/spearrandrange < 0.2 && randrange/spearrandrange > -0.2){
                    //console.log("spear and survivor are too close, increasing height")
                    randrange += 50
                }
                //}
                var newobstacle = new Survivor(this.scene, this.sprite.body.x, this.sprite.body.y - randrange, 'spaceship', 0, this, "spear").setOrigin(0, 0);
                
            //}
            this.scene.survivorcount = 0;
        }

        //spawns floorspikes
        if(this.scene.time > 20 && (this.scene.time % this.scene.spikerate) == 0 && this.scene.spawncount != 0){
            var newobst = new Spike(this.scene, this.sprite.body.x, this.sprite.body.y - 40, 'spaceship', 0, this).setOrigin(0, 0);
            if(this.scene.time > 80){
                var newobst = new Spike(this.scene, this.sprite.body.x + this.sprite.body.width, this.sprite.body.y - 20, 'spaceship', 0, this).setOrigin(0, 0);

                this.scene.spikerate = Math.ceil(Math.random() * 4) + 3;
            }
        }

        //spawns falling pokers
        if(this.scene.time > 40 && (this.scene.time % this.scene.pokerrate) == 0){
            var newobst = new Poker(this.scene, this.sprite.body.x, -170, 'spaceship', 0, this).setOrigin(0, 0);
        }

        //every 1
        if(this.scene.time % 5 == 0 && this.scene.scrollSpeed < 600){
            //console.log("Speedup! Speed is: " + game.config.scrollSpeed);
            this.scene.scrollSpeed += 10;
        }
    }
}
  