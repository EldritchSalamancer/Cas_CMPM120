class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {
        this.VEL = 100  // slime velocity constant
    }

    preload() {
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        //this.load.path = './assets/'
        this.load.spritesheet('slime', './assets/tilemap/slime.png', {
            frameWidth: 16,
            frameHeight: 16
        })

        this.load.image('tilesetImage', './assets/tilemap/tileset.png');
        this.load.tilemapTiledJSON('tilemapJSON', "./assets/tilemap/overworld3.json");
    }
    
    create() {
        //tilemap stuff
        const map = this.add.tilemap('tilemapJSON');
        const tileset = map.addTilesetImage('tileset', 'tilesetImage');
        const bgLayer = map.createLayer('Background', tileset, 0, 0);
        const terrainLayer = map.createLayer('Terrain', tileset, 0, 0);
        const treeLayer = map.createLayer('Trees', tileset, 0, 0);

        terrainLayer.setCollisionByProperty({collides: true});
        treeLayer.setCollisionByProperty({collides: true});

        

        // add player
        /*this.buster = this.physics.add.sprite(32, 32, 'buster', 0)
        this.buster.body.setCollideWorldBounds(true)*/

        // buster animation animation
        this.anims.create({
            key: 'standr',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('buster', {
                start: 0,
                end: 0
            })
        })
        // buster animation animation
        this.anims.create({
            key: 'walkr',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('buster', {
                start: 0,
                end: 1
            })
        })
        // buster animation animation
        this.anims.create({
            key: 'standl',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('buster', {
                start: 2,
                end: 2
            })
        })
        // buster animation animation
        this.anims.create({
            key: 'walkl',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('buster', {
                start: 2,
                end: 3
            })
        })

        this.playerdir = "up";
        this.player = new Buster (this, 200, 200, 'laser', 0, "up").setOrigin(0, 0)
        this.player.sprite.play('standr');



        this.cameras.main.setBounds(0, 0, map.widthInPixels);
        this.cameras.main.startFollow(this.player.sprite, true, 0.25, 0.25);

        this.physics.world.setBounds(0,0, map.widthInPixels, map.heightInPixels);

        this.physics.add.collider(this.player.sprite, terrainLayer);
        this.physics.add.collider(this.player.sprite, treeLayer);

        // input
        this.cursors = this.input.keyboard.createCursorKeys()

        this.lasersound = this.sound.add('pew', {volume: 0.2});
    }

    update() {
        // player movement
        /*this.direction = new Phaser.Math.Vector2(0)
        if(this.cursors.left.isDown) {
            this.direction.x = -1
        } else if(this.cursors.right.isDown) {
            this.direction.x = 1
        }

        if(this.cursors.up.isDown) {
            this.direction.y = -1
        } else if(this.cursors.down.isDown) {
            this.direction.y = 1
        }

        this.direction.normalize()
        this.player.sprite.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y);*/
        this.player.update();

    }
}
