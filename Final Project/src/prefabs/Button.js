class Button extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, text, cost, color, i, dialog) {
      super(scene, x, y, texture, frame);
      
      //adds sprite
      this.sprite = scene.physics.add.sprite(x, y, 'shopbutton');
      this.sprite.scaleX = 1.5; this.sprite.scaleY = 1.5;
      this.sprite.anims.play('unsel_button');  

      //adds text
      this.txt = scene.add.text(x - 15,y, text, { fontSize: 22 });
      this.cost = cost;

      //adds image
      if(i != undefined){
        this.hat= new Hat(this.scene, x-35, y, 'hats', 0, i).setOrigin(0, 0);
        this.hat.sprite.scaleX = 1.8; this.hat.sprite.scaleY = 1.8;
        this.color = color;
        this.i = i;
      }
      this.dialog;
    }
    
}