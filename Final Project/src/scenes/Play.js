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

        

        // add slime
        this.slime = this.physics.add.sprite(32, 32, 'slime', 0)
        this.slime.body.setCollideWorldBounds(true)

        // slime animation
        this.anims.create({
            key: 'jiggle',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('slime', {
                start: 0,
                end: 1
            })
        })
        this.slime.play('jiggle');

        this.cameras.main.setBounds(0, 0, map.widthInPixels);
        this.cameras.main.startFollow(this.slime, true, 0.25, 0.25);

        this.physics.world.setBounds(0,0, map.widthInPixels, map.heightInPixels);

        this.physics.add.collider(this.slime, terrainLayer);
        this.physics.add.collider(this.slime, treeLayer);

        // input
        this.cursors = this.input.keyboard.createCursorKeys()

        this.lasersound = this.sound.add('pew', {volume: 0.2});
    }

    update() {
        // slime movement
        this.direction = new Phaser.Math.Vector2(0)
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
        this.slime.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y)

        //spawns ghostfighting lasers
        if(Phaser.Input.Keyboard.DownDuration(keySPACE, 200)){
            //console.log("space is down");
            this.lasersound.play();
            var laser = new Laser(this, this.slime.x, this.slime.y, 'laser', 0).setOrigin(0, 0)
        }
    }
}
