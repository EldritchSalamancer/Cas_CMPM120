class Laser extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, dir) {
      super(scene, x, y, texture, frame);
      
      this.sprite = scene.physics.add.sprite(x + 20, y + 30, 'laser');
      scene.lasers.add(this.sprite);
      this.sprite.scaleX = 0.7; this.sprite.scaleY = 0.7;
      //his.sprite.anims.play('unsel_button');  
        //console.log("making new laser");
      //this.txt = scene.add.text(x-5,y, text, { fontSize: 22 });
      //this.txt = scene.add.text(0,0, text, { fontSize: 22 });

      //sets speed of laser
      //var xspeed; var yspeed;
      this.dir = dir
      if(dir == "right"){
        this.xspeed = 1;
        this.yspeed = 0;

      }
      else if(dir == "left"){
        this.xspeed = -1;
        this.yspeed = 0;
      }
      else if(dir == "up"){
        this.xspeed = 0;
        this.yspeed = -1;
        this.sprite.angle = 90;
      }
      else if(dir == "down"){
        this.xspeed = 0;
        this.yspeed = 1;
        this.sprite.angle = 90;
      }
      
      //console.log("laser dir is: " + dir);
      //console.log("laser xspeed is: " + this.xspeed);
      this.sprite.body.setVelocity(this.xspeed, this.yspeed);
      this.sprite.setVelocity(this.scene.VEL * this.xspeed * 2, this.scene.VEL * this.yspeed * 2);
    }

    update(){
        
        //this.sprite.setVelocity(this.scene.VEL * this.xspeed, this.scene.VEL * this.yspeed);
    }
    
    
}