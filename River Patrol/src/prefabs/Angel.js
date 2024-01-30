//spaceship prefab

class Angel extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointValue, rand){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        //this.moveSpeed = 3;
        this.moveSpeed = game.settings.spaceshipSpeed + 2
        this.rand = rand;
        //console.log("Angel instantiated");
        this.speedup = 0;
        scene.time.delayedCall(30000, () => {
            this.speedup = 2;
        }, null, this);
    }

    update(){
        //console.log("Angel position is: " + this.x + " " + this.y)
        this.x -= (this.moveSpeed + this.speedup) * this.rand;

        if(this.x <= 0 - this.width && this.rand == 1){
            this.x = game.config.width;
        }
        else if(this.x > game.config.width + this.width && this.rand == -1){
            this.x = 0;
        }
    }

    reset(){
        if(this.rand == 1){
            this.x = game.config.width;
        }
        else if(this.rand == -1){
            this.x = 0;
        }
    }
}