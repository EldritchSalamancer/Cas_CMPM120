class Laser extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
      
      this.sprite = scene.physics.add.sprite(x, y, 'laser');
      //button.frame = 0;
      this.sprite.scaleX = 0.7; this.sprite.scaleY = 0.7;
      //his.sprite.anims.play('unsel_button');  
        //console.log("making new laser");
      //this.txt = scene.add.text(x-5,y, text, { fontSize: 22 });
      //this.txt = scene.add.text(0,0, text, { fontSize: 22 });
      this.sprite.body.velocity.x = 200;
    }

    update(){
        //console.log("ground position is: " + this.sprite.body.x)
        this.sprite.body.x += 1;
    }
    
    
}