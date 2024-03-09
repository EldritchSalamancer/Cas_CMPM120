class Untouch extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
      
      this.scrollSpeed = 200;

      //where to teleport ground if it goes too far 
      //this.startingx = game.config.width + ground.sprite.body.width + 130;
      //this.startingy = 2*game.config.height/3 + 50;
      //this.endingx = -game.config.width/5;

      this.sprite = scene.physics.add.sprite(x, y, texture).setOrigin(0, 0);
      this.startingx = game.config.width + this.sprite.body.width + 130;
      this.endingx = -game.config.width/5;
    
      this.scene.untoucharr.push(this);
    }

    update(){
        //console.log("untouch updating");
        this.sprite.body.velocity.x = - this.scene.scrollSpeed

        if(this.sprite.body.x < this.endingx){
            this.reset();
        }


    }
    
    reset(){
        //moves back ground tracker to starting location
        this.sprite.body.x += this.startingx;
    }
}