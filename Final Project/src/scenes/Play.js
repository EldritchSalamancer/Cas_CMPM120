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
    }
    
    create() {
        //tilemap stuff
        const map = this.add.tilemap('tilemapJSON');
        const tileset = map.addTilesetImage('tileset3', 'tilesetImage');
        const bgLayer = map.createLayer('Background', tileset, 0, 0);
        const terrainLayer = map.createLayer('Terrain', tileset, 0, 0);
        const treeLayer = map.createLayer('Trees', tileset, 0, 0);
        terrainLayer.setCollisionByProperty({collides: true});
        treeLayer.setCollisionByProperty({collides: true});

    
        //HUD
        this.HUD = this.physics.add.sprite(320, 445, "hud"); this.HUD.scaleY = 0.7
        for(var i = 0; i < this.health; i++){
            xtxt = xtxt + "X";
        }
        this.moneytxt = this.add.text(config.width - 110, config.height - 35, money, { fontSize: 24, color: "black", backgroundColor: "#ADD8E6"});
        this.questtxt = this.add.text(config.width - 440, config.height - 35, "Fend off the Ghost invasion!", { fontSize: 12, color: "black"});
        this.healthtxt = this.add.text(40, config.height - 35,  xtxt, { fontSize: 24, color: "black", backgroundColor: "#ADD8E6"});
        this.cameras.main.setBounds(0, 0, map.widthInPixels);

        //spawns player
        this.playerdir = "up";
        this.player = new Buster(this, 200, 200, 'laser', 0, this.playerhat).setOrigin(0, 0);
        this.player.sprite.play('standr');
        var xtxt = "X".repeat(health);
        
        //camera & map collision
        this.physics.world.setBounds(0,0, map.widthInPixels, map.heightInPixels);
        this.physics.add.collider(this.player.sprite, terrainLayer);
        this.physics.add.collider(this.player.sprite, treeLayer);
        this.cursors = this.input.keyboard.createCursorKeys()

        //lasers and ghosts
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
            laser.destroy();
            ghost.destroyed = true;
            this.zap.play();
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
            if(health > 0){
                health -= 1
            } 
            if(money < 0){
                money = 0;
            }
            this.spook.play();
        })

        //sounds
        this.music = this.sound.add('gamemusic', {volume: 0.5});
        this.music.loop = true;
        this.music.play();
        this.zap = this.sound.add('zap', {volume: 0.5});
        this.spook = this.sound.add('spook', {spook: 0.5});

        //store
        this.store = this.physics.add.sprite(100, 100, "shopbutton");
        this.store.visible = false;
        this.store.scaleX = 0.5;
        this.physics.add.collider(this.player.sprite, this.store, (player, store) => {
            this.music.stop();
            this.scene.start("shopScene");
        })

        this.time = 0;
    }

    update() {
        //Updates HUD
        if(money > 9999){
            money = 9999;
        }
        this.player.update();

        for(var i = 0; i < this.ghostarr.length; i++){
            this.ghostarr[i].update();
        }
        this.moneytxt.text = money;
        var xtxt = ""
        for(var i = 0; i < this.health; i++){
            xtxt = xtxt + "X";
        }
        this.healthtxt.text = "X".repeat(health);

        //Game Over
        if(health <= 0){
            hat = 0;
            spawnrate = 50;
            spawncount = 0;
            health = 5;
            this.music.stop();
            this.scene.start("menuScene");
        }

        //Spawns Enemies
        this.time += 1;
        if(this.time >= spawnrate){
            spawncount += 1;
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
        //Increases enemy spawnrate & slowly heals over time
        if(spawncount >= 8){
            spawncount = 0;
            if(spawnrate > 25){
                spawnrate -= 1;
            }
            if(health < 5){
                health += 1;
            }
        }
    }
}
