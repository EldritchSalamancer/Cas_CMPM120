class MainMenu extends Phaser.Scene {
    constructor() {
        super('mainmenuScene');
        console.log('MainMenu: constructor');
    }

    init(){
        console.log('MainMenu: init');
        this.HP = 100; //this is a variable attatched to this scene, is a proccess of this scene
        this.EXP = 0;
        console.log('HP: '+ this.HP + ' EXP: ' + this.EXP);
    }

    preload(){
        console.log("MainMenu: preload");
        this.load.path = './assets/img/'; 
        this.load.image('tomato',"tomato.png");
    }

    create(){
        console.log("MainMenu: create");

        let playerStats = {
            HP: this.HP,    //asign HP to the value tied to the scene of the same name
            EXP: this.EXP
        }

        this.scene.start('playScene', playerStats); //passes PLayerstats to carry over data
    }
}