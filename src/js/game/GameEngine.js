import LevelManager from "../manager/LevelManager.js";

export default class GameEngine {
    constructor() {
        this.levelManager = new LevelManager();
        this.movingGoombas = [];
    }

    /**
     * Launch the game
     */
    play = (time) => {
        this.movingGoombas.forEach(goomba => {
            console.log(goomba);
            goomba.move();
        })
        let goomba = this.levelManager.getCurrentLevel().getGoombas();
        if (goomba && goomba.length > 0) {  // Vérifie si le tableau existe et n'est pas vide
            const goom = goomba.pop();
            goom.createGoomba();
            //goom.move();
            this.movingGoombas.push(goom);
        }
        requestAnimationFrame(this.play);
    }
}