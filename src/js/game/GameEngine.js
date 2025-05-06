import LevelManager from "../manager/LevelManager.js";
import Player from "../characters/Player.js";
import {ScaleFactor} from "../scale/ScaleFactor.js";

export default class GameEngine {
    constructor() {
        this.levelManager = new LevelManager();
        this.player = new Player(window.innerWidth / 2, window.innerHeight * 0.67 - ScaleFactor.PLAYER_SIZE, 0, 0);
        this.movingGoombas = [];
    }

    /**
     * Launch the game
     */
    play = (time) => {
        this.movingGoombas.forEach(goomba => {
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