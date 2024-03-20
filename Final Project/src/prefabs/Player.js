class Buster extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
      
      this.scene = scene;;
      this.playerdir = "right";;
      this.walking = false;
      this.facingright = true;
        
      // add player
      this.sprite = scene.physics.add.sprite(x, y, 'buster', 0);
      this.sprite.scaleX = 1.9; this.sprite.scaleY = 1.9;
      this.sprite.body.setCollideWorldBounds(true);
      
      //adds players decorative hat
      this.hatp = new Hat(this.scene, 200, 200, 'hats', 0, hat).setOrigin(0, 0);
      this.hatp.sprite.scaleX = 1.4; this.hatp.sprite.scaleY = 1.4; 
    }

    update(){
        
        //Handles Animations
        this.justwalking = false;
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.facingright = false;
            this.sprite.play("walkl")
            this.playerdir = "left";
            this.hatp.sprite.scaleX = -1.4;
            this.walking = true;
        }
        else if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            this.facingright = true;
            this.sprite.play("walkr")
            this.playerdir = "right";
            this.hatp.sprite.scaleX = 1.4;
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

        //moves hat to match wtih player
        this.hatp.sprite.x = this.sprite.body.x + 18;
        this.hatp.sprite.y = this.sprite.body.y + 10;

        //fires lasers
        if(Phaser.Input.Keyboard.DownDuration(keySPACE, 200)){
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
    }
}