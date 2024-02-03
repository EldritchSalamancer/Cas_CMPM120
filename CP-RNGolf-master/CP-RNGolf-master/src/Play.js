class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {
        // useful variables
        this.SHOT_VELOCITY_X = 200
        this.SHOT_VELOCITY_Y_MIN = 700
        this.SHOT_VELOCITY_Y_MAX = 1100
        this.barMove = 1;
        this.time = 0
        this.score = 0;
    }

    preload() {
        this.load.path = './assets/img/'
        this.load.image('grass', 'grass.jpg')
        this.load.image('cup', 'cup.jpg')
        this.load.image('ball', 'ball.png')
        this.load.image('wall', 'wall.png')
        this.load.image('oneway', 'one_way_wall.png')
    }

    create() {
        // add background grass
        this.grass = this.add.image(0, 0, 'grass').setOrigin(0)

        // add cup
        this.cup = this.physics.add.sprite(width/2, height/10, 'cup')
        this.cup.body.setCircle(this.cup.width/4)
        this.cup.body.setOffset(this.cup.width/4)
        this.cup.body.setImmovable(true);

        // add ball
        this.ball = this.physics.add.sprite(width/2, height - height /10, 'ball')
        this.ball.body.setCircle(this.ball.width/2)
        this.ball.body.setCollideWorldBounds(true)
        this.ball.body.setBounce(0.5)
        this.ball.body.setDamping(true).setDrag(0.5)
        this.balls = this.add.group([this.ball])

        // add walls
        this.wallA = this.physics.add.sprite(0, height/4, 'wall')
        //this.wallA = wallA;
        //this.wallA.setX(Phaser.Math.Between(0 + this.wallA.width/2, width - this.wallA.width/2))
        this.wallA.setX(width/2)
        this.wallA.body.setImmovable(true);
        this.wallA.body.setCollideWorldBounds(true);
        this.wallA.setBounce(1);

        let wallB = this.physics.add.sprite(0, height/2, 'wall')
        wallB.setX(Phaser.Math.Between(0 + wallB.width/2, width - wallB.width/2))
        wallB.body.setImmovable(true);

        this.walls = this.add.group([this.wallA, wallB])
        // add one-way
        this.oneWay = this.physics.add.sprite(width/2, 3*height/(4), 'oneway')
        this.oneWay.setX(Phaser.Math.Between(0 + this.oneWay.width/2, width - this.oneWay.width/2))
        this.oneWay.body.setImmovable(true);
        this.oneWay.body.checkCollision.down = false;

        // add pointer input
        this.input.on('pointerdown',(pointer) => {
            let shotDirection = pointer.y <= this.ball.y ? 1 : -1
            let shotDirectionX = pointer.x <= this.ball.x ? 1 : -1
            this.ball.body.setVelocityX(this.SHOT_VELOCITY_X * shotDirectionX);
            this.ball.body.setVelocityY(Phaser.Math.Between(this.SHOT_VELOCITY_Y_MIN, this.SHOT_VELOCITY_Y_MAX) * shotDirection)
        })

        // cup/ball collision
        this.physics.add.collider(this.ball, this.cup, (ball, cup) => {
            ball.destroy();
            this.ball = this.physics.add.sprite(width/2, height - height /10, 'ball')
            this.ball.body.setCircle(this.ball.width/2)
            this.ball.body.setCollideWorldBounds(true)
            this.ball.body.setBounce(0.5)
            this.ball.body.setDamping(true).setDrag(0.5)
            //this.physics.add.collider(this.balls, this.walls)
            //this.physics.add.collider(this.ball, this.oneWay)
            this.balls.add(this.ball);
            this.score += 1;
            this.txt.text = "Score: " + this.score;
            AddListen(this);
        })

        // ball/wall collision
        this.physics.add.collider(this.balls, this.walls)

        // ball/one-way collision
        this.physics.add.collider(this.balls, this.oneWay)

        this.txt = this.add.text(0,0,"Score: "  + '0');
    }

    update() {
        this.time += 1;
        /*if(this.barMove == true){
            console.log("moving forwards")
            this.wallA.body.velocity.x = 150
        }
        else{
            console.log("moving backwards")
            this.wallA.body.velocity.x = -150
        }*/
        this.wallA.body.velocity.x = 150 * this.barMove
        console.log("barmove is: " + this.barMove)
        /*if(this.time > 200){
            console.log("reset time")
            this.time = 0;
            if(this.barMove){
                console.log("barmove now false")
                this.barmove = -1;
            }
            else{
                this.barmove = 1;
            }
            this.time = 0;

        }*/
        if(this.time < 300){
            this.barMove = 1;
        }
        else if(this.time < 600){
            this.barMove = -1;
        }
        else{
            this.time = 0;
        }
    }
    
    changedir(){
        if(this.barMove == true){
            this.barMove = false;
            this.wallA.body.setVelocityX(-150);
        }
        else{
            this.barMove = true;
            this.wallA.body.setVelocityX(150);
        }
    }
}

function AddListen(tis){
    tis.physics.add.collider(tis.ball, tis.cup, (ball, cup) => {
        ball.destroy();
        tis.ball = tis.physics.add.sprite(width/2, height - height /10, 'ball')
        tis.ball.body.setCircle(tis.ball.width/2)
        tis.ball.body.setCollideWorldBounds(true)
        tis.ball.body.setBounce(0.5)
        tis.ball.body.setDamping(true).setDrag(0.5)
        //this.physics.add.collider(this.balls, this.walls)
        //this.physics.add.collider(this.ball, this.oneWay)
        tis.balls.add(tis.ball);
        tis.score += 1;
        tis.txt.text = "Score: " + tis.score;
        AddListen(tis);
    })
}
/*
CODE CHALLENGE
Try to implement at least 3/4 of the following features during the remainder of class (hint: each takes roughly 15 or fewer lines of code to implement):
[X] Add ball reset logic on successful shot
[ ] Improve shot logic by making pointer’s relative x-position shoot the ball in correct x-direction
[X] Make one obstacle move left/right and bounce against screen edges
[X] Create and display shot counter, score, and successful shot percentage
*/