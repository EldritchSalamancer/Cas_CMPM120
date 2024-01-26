class Movement extends Phaser.Scene {
    constructor() {
        super('movementScene')
    }

    init(){
        this.PLAYER_VELOCITY = 450
    }

    preload() {
        this.load.spritesheet('character', './assets/spritesheets/Character_002.png',{
            frameWidth:48
        })
    }

    create() {
        console.log('now in movement scene 👍')
        this.cameras.main.setBackgroundColor(0xDDDDDD)

        //create animations
        this.anims.create({ //all this is a signle amo,atopm 
            key: 'idle-down',
            frameRate: 0, //frames dont change while idle
            repeat: -1, //infinetley repeat
            frames: this.anims.generateFrameNumbers('character',{
                start: 1,
                end: 1
            })
        })

        this.anims.create({ //all this is a signle amo,atopm 
            key: 'walk-down',
            frameRate: 5, //frames dont change while idle
            repeat: -1, //infinetley repeat
            frames: this.anims.generateFrameNumbers('character',{
                start: 0,
                end: 2
            })
        })


        //this.player = this.add.sprite(width/2, height/2, 'character', 1).setScale(2);
        this.player = this.physics.add.sprite(width/2, height/2, 'character', 1).setScale(2);
        this.player.body.setCollideWorldBounds(true);

        this.player.body.setSize(32, 32).setOffset(8,16);

        cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        let playerVector = new Phaser.Math.Vector2(0,0)
        let playerDirection = 'down'

        //left/right
        if(cursors.left.isDown){
            //this.player.x -= this.PLAYER_VELOCITY
            playerVector.x = -1
            playerDirection = 'left'
        }
        else if(cursors.right.isDown){
            //this.player.x += this.PLAYER_VELOCITY
            playerVector.x = 1
            playerDirection = 'right'
        }

        //up/down movement
        if(cursors.up.isDown){
            //this.player.y -= this.PLAYER_VELOCITY
            playerVector.y = -1
            playerDirection = 'up'
        }
        else if(cursors.down.isDown){
            //this.player.y += this.PLAYER_VELOCITY
            playerVector.y = 1
            playerDirection = 'down'
        }

        playerVector.normalize();

        this.player.setVelocity(this.PLAYER_VELOCITY * playerVector.x, this.PLAYER_VELOCITY * playerVector.y)
        //this.player.x += playerVector.x * this.PLAYER_VELOCITY
        //this.player.y += playerVector.y * this.PLAYER_VELOCITY

        let playerMovement
        playerVector.length() ? playerMovement = 'walk' : playerMovement = 'idle'
        this.player.play(playerMovement + '-' + playerDirection, true)
    }
}