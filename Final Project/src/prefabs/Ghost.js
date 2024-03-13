class Ghost extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
      

    
      this.sprite = scene.physics.add.sprite(x, y, 'ghost');
      //button.frame = 0;
      this.sprite.scaleX = 1.5; this.sprite.scaleY = 1.5;
      //this.sprite.anims.play('unsel_button');  
      this.scene = scene;
      scene.ghosts.add(this.sprite);
      scene.ghostarr.push(this);
      
      this.speed = 0.6;
      this.sprite.destroyed = false;
    }

    update(){

        if(this.sprite.destroyed != true){
        //moves ghost twoards player
        if(this.scene.player.sprite.body.x > this.sprite.body.x){
            this.sprite.body.x += this.speed;
        }
        else{
            this.sprite.body.x -= this.speed;
        }

        //moves ghost twoards player
        if(this.scene.player.sprite.body.y > this.sprite.body.y){
            this.sprite.body.y += this.speed;
        }
        else{
            this.sprite.body.y -= this.speed;
        }
        }
        else{
            this.sprite.body.x = 1000;
            this.sprite.body.y = 1000;
        }
        //console.log("ground position is: " + this.sprite.body.x)
        //this.x = this.sprite.x;
    }
    
    
}