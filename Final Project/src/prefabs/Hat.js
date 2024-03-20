class Hat extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, hatnum) {
      super(scene, x, y, texture, frame);
      
      //this.sprite = scene.physics.add.sprite(x, y, 'shopbutton');
      //button.frame = 0;
      //this.sprite.scaleX = 1.5; this.sprite.scaleY = 1.5;
      this.sprite = scene.physics.add.sprite(x, y, 'hats'); 
      //this.sprite.scaleX = 1.5; this.sprite.scaleY = 1.5;
      switch(hatnum){
        case 0:  this.sprite.play("hat0"); break;
        case 1:  this.sprite.play("hat1"); break;
        case 2:  this.sprite.play("hat2"); break;
        case 3:  this.sprite.play("hat3"); break;
        case 4:  this.sprite.play("hat4"); break;
        case 5:  this.sprite.play("hat5"); break;
        case 6:  this.sprite.play("hat6"); break;
        case 7:  this.sprite.play("hat7"); break;
      }
      //this.txt = scene.add.text(0,0, text, { fontSize: 22 });
    }

    update(){
        //console.log("ground position is: " + this.sprite.body.x)
        //this.x = this.sprite.x;
        //if(scene.player != undefined){

        //}
    }
}