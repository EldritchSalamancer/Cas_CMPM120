class Play extends Phaser.Scene {
    constructor(){
        super('playScene');
        console.log("Play: constructor");
    }

    init(stats){
        console.log("Play: init");
        this.HP = stats.HP;
        this.EXP = stats.EXP;
    }

    create(){
        console.log("Play: create");
        console.log('HP: '+ this.HP + ' EXP: ' + this.EXP);
        
        //first init is the "key", second means we dont need to put it in?
        //third input keeps scene from auto starting
        this.scene.add("statsoverlayScene", StatsOverlay, false); 
        this.scene.launch("statsoverlayScene");

        this.add.image(0, 0, 'tomato').setOrigin(0);
    }

    update(){
        //console.log("Play: update");
    }
}