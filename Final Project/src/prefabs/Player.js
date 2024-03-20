class Buster extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
      
      //this.sprite = scene.physics.add.sprite(x, y, 'shopbutton');
      //button.frame = 0;
      this.scene = scene;
      //this.sprite.scaleX = 1.5; this.sprite.scaleY = 1.5;
      //this.sprite.anims.play('unsel_button');  

      //this.txt = scene.add.text(x-5,y, text, { fontSize: 22 });

      this.playerdir = "right";
      //this.txt = scene.add.text(0,0, text, { fontSize: 22 });
    
      this.walking = false;
      this.facingright = true;
        
      // add player
      this.sprite = scene.physics.add.sprite(x, y, 'buster', 0);
      this.sprite.scaleX = 1.5; this.sprite.scaleY = 1.5;
      this.sprite.body.setCollideWorldBounds(true);

      //this.hat = scene.add.rectangle(x, y, 12, 12, hatcolor);
      //this.hat = new Hat(this, x, y, 'hats', 0, hat).setOrigin(0, 0);
      //this.hat = hat;
      
      this.hatp = new Hat(this.scene, 200, 200, 'hats', 0, hat).setOrigin(0, 0);
    }

    update(){
        //console.log("ground position is: " + this.sprite.body.x)
        //this.x = this.sprite.x;
        this.justwalking = false;
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.facingright = false;
            this.sprite.play("walkl")
            this.playerdir = "left";
            this.hatp.sprite.scaleX = -1;
            this.walking = true;
        }
        else if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            this.facingright = true;
            this.sprite.play("walkr")
            this.playerdir = "right";
            this.hatp.sprite.scaleX = 1;
            this.walking = true;
        }
        else if(Phaser.Input.Keyboard.JustDown(keyUP)){
            if(this.facingright){
                this.sprite.play("walkr");
            }
            else{
                this.sprite.play("walkl");
            }
            this.playerdir = "up";
            this.walking = true;
        }
        else if(Phaser.Input.Keyboard.JustDown(keyDOWN)){
            if(this.facingright){
                this.sprite.play("walkr");
            }
            else{
                this.sprite.play("walkl");
            }
            this.playerdir = "down";
            this.walking = true;
        }
        

        if(Phaser.Input.Keyboard.JustDown(keyW)){
            this.playerdir = "up";
        }
        if(Phaser.Input.Keyboard.JustDown(keyA)){
            this.playerdir = "left";
        }
        if(Phaser.Input.Keyboard.JustDown(keyS)){
            this.playerdir = "down";
        }
        if(Phaser.Input.Keyboard.JustDown(keyD)){
            this.playerdir = "right";
        }

        if(Phaser.Input.Keyboard.DownDuration(keyRIGHT, 999999) ||
        Phaser.Input.Keyboard.DownDuration(keyLEFT, 999999) || 
        Phaser.Input.Keyboard.DownDuration(keyUP, 999999) || 
        Phaser.Input.Keyboard.DownDuration(keyDOWN, 999999)){
            this.walking = true;
        }
        else{
            if(this.facingright){
                this.sprite.play("standr");
            }
            else{
                this.sprite.play("standl");
            }
        }


        /*if(this.walking == false){
            if(this.facingright){
                this.sprite.play("standr");
            }
            else{
                this.sprite.play("standl");
            }
        }
        else{
            if(this.facingright){
                this.sprite.play("standr");
            }
            else{
                
            }
        }*/

        
        this.hatp.sprite.x = this.sprite.body.x + 17;
        this.hatp.sprite.y = this.sprite.body.y + 7;

        

        //spawns ghostfighting lasers
        //console.log("player dir is: " + this.playerdir);
        if(Phaser.Input.Keyboard.DownDuration(keySPACE, 200)){
            //console.log("space is down");
           this.scene.lasersound.play();
            var laser = new Laser(this.scene, this.sprite.body.x, this.sprite.body.y, 'laser', 0, this.playerdir).setOrigin(0, 0)
        }

        // player movement
        this.direction = new Phaser.Math.Vector2(0)
        if(this.scene.cursors.left.isDown) {
            this.direction.x = -1
        } else if(this.scene.cursors.right.isDown) {
            this.direction.x = 1
        }

        if(this.scene.cursors.up.isDown) {
            this.direction.y = -1
        } else if(this.scene.cursors.down.isDown) {
            this.direction.y = 1
        }

        this.direction.normalize()
        this.sprite.setVelocity(this.scene.VEL * this.direction.x, this.scene.VEL * this.direction.y);

        //console.log("player position is: " + this.sprite.body.x + ", " + this.sprite.body.y)
        //console.log("walking is: " + this.walking);
    }

    
}