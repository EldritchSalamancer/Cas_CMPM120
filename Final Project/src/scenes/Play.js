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
465
        this.load.image('tilesetImage', './assets/tilemap/Tileset2.png');
        this.load.tilemapTiledJSON('tilemapJSON', "./assets/tilemap/tileset4.json");
        //this.load.tilemapTiledJSON('tilemapJSON', "./assets/tilemap/tileset4.tmj");
    }
    
    create() {
        //tilemap stuff
        //const map = this.add.tilemap('tilemapJSON');
        const map = this.add.tilemap('tilemapJSON');
        const tileset = map.addTilesetImage('tileset3', 'tilesetImage');
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
        //this.playerhat = new Hat(this, 200, 200, 'hats', 0, hat).setOrigin(0, 0);
        this.player = new Buster(this, 200, 200, 'laser', 0, this.playerhat).setOrigin(0, 0);
        this.player.sprite.play('standr');


        this.moneytxt = this.add.text(config.width - 120, 20, "Money: " + money);
        this.cameras.main.setBounds(0, 0, map.widthInPixels);
        //this.cameras.main.startFollow(this.player.sprite, true, 0.25, 0.25);

        this.physics.world.setBounds(0,0, map.widthInPixels, map.heightInPixels);

        this.physics.add.collider(this.player.sprite, terrainLayer);
        this.physics.add.collider(this.player.sprite, treeLayer);

        // input
        this.cursors = this.input.keyboard.createCursorKeys()

        this.lasersound = this.sound.add('pew', {volume: 0.2});

        this.lasers = this.add.group([]);
        this.ghosts = this.add.group([]);
        this.ghostarr = [];

        //  ghost/laser collision
        this.physics.add.collider(this.lasers, this.ghosts, (laser, ghost) => {
            for(var i = 0; i < this.ghostarr.length; i++){
                if(this.ghostarr[i] == ghost){
                    this.ghostarr.splice(i, 1);
                    break;
                }
            }
            ghost.destroyed = true;
            this.zap.play();
            //ghost.destroy();
            money += 20;
        })

        //  player/ghost collision
        this.physics.add.collider(this.player.sprite, this.ghosts, (player, ghost) => {
            for(var i = 0; i < this.ghostarr.length; i++){
                if(this.ghostarr[i] == ghost){
                    this.ghostarr.splice(i, 1);
                    break;
                }
            }
            //ghost.destroy();
            ghost.destroyed = true;
            money -= 50;
            if(money < 0){
                money = 0;
            }
            this.spook.play();
        })

        this.store = this.physics.add.sprite(100, 100, "shopbutton");
        this.store.visible = false;
        this.store.scaleX = 0.5;

        this.music = this.sound.add('gamemusic', {volume: 0.2});
        this.music.loop = true;
        this.music.play();
        this.zap = this.sound.add('zap', {volume: 0.5});
        this.spook = this.sound.add('spook', {spook: 0.5});
        //this.shoptxt = this.add.text(100, 100, "STORE");
        this.physics.add.collider(this.player.sprite, this.store, (player, store) => {
            this.music.stop();
            this.scene.start("shopScene");
        })

        this.time = 0;
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

        for(var i = 0; i < this.ghostarr.length; i++){
            this.ghostarr[i].update();
        }
        this.moneytxt.text = "Money: " + money;

        this.time += 1;
        if(this.time >= 50){
            console.log("spawning ghost");
            this.time = 0;
            var random = Math.ceil(Math.random() * 4);
            if(random == 1){
                var newghost = new Ghost (this, Math.random() * config.width, -50, 'ghost', 0).setOrigin(0, 0);
            }
            if(random == 2){
                var newghost = new Ghost (this, -50, Math.random() * config.height, 'ghost', 0).setOrigin(0, 0);
            }
            if(random == 3){
                var newghost = new Ghost (this,  Math.random() * config.width, config.height + 50, 'ghost', 0).setOrigin(0, 0);
            }
            if(random == 4){
                var newghost = new Ghost (this, config.width + 50, Math.random() * config.height, 'ghost', 0).setOrigin(0, 0);
            }
            
        }
    }
}
