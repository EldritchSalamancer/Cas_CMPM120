class Button extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, text, cost, color, i, dialog) {
      super(scene, x, y, texture, frame);
      
      this.sprite = scene.physics.add.sprite(x, y, 'shopbutton');
      //button.frame = 0;
      this.sprite.scaleX = 1.5; this.sprite.scaleY = 1.5;
      this.sprite.anims.play('unsel_button');  

      this.txt = scene.add.text(x - 15,y, text, { fontSize: 22 });
      this.cost = cost;

      //this.hat = scene.add.rectangle(x-30, y, 15, 15, color);
      if(i != undefined){
        this.hat= new Hat(this.scene, x-35, y, 'hats', 0, i).setOrigin(0, 0);
        this.hat.sprite.scaleX = 1.5; this.hat.sprite.scaleY = 1.5;
        this.color = color;
        this.i = i;
      }
      this.dialog;
    }

    update(){
        //console.log("ground position is: " + this.sprite.body.x)
        //this.x = this.sprite.x;
    }
    
    
}