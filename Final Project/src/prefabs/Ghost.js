class Ghost extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
    
      this.sprite = scene.physics.add.sprite(x, y, 'ghost');
      this.sprite.scaleX = 1.5; this.sprite.scaleY = 1.5; 
      this.scene = scene;
      scene.ghosts.add(this.sprite);
      scene.ghostarr.push(this);
      this.speed = 1.2;
      this.sprite.destroyed = false;
    }

    update(){

        //moves ghost twoards player
        if(this.sprite.destroyed != true){
            if(this.scene.player.sprite.body.x > this.sprite.body.x){
                this.sprite.body.x += this.speed;
            }
            else{
                this.sprite.body.x -= this.speed;
            }
            if(this.scene.player.sprite.body.y > this.sprite.body.y){
                this.sprite.body.y += this.speed;
            }
            else{
                this.sprite.body.y -= this.speed;
            }
        }
        //puts ghost out of bounds
        else{
            this.sprite.body.x = 1000;
            this.sprite.body.y = 1000;
        }
    }  
}