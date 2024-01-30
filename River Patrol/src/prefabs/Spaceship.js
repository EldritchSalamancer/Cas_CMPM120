//spaceship prefab

class Spaceship extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointValue, rand){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        //this.moveSpeed = 3;
        this.moveSpeed = game.settings.spaceshipSpeed 
        this.rand = rand;

        //speeds up ship after 30 seconds
        this.speedup = 0;
        scene.time.delayedCall(30000, () => {
            this.speedup = 2;
        }, null, this);
    }

    update(){
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