import LevelManager from "../manager/LevelManager.js";
import Player from "../characters/Player.js";
import {ScaleFactor} from "../scale/ScaleFactor.js";
import GoombaManager from "../manager/GoombaManager.js";

export default class GameEngine {
    constructor() {
        this.levelManager = new LevelManager();
        this.goombaManager = new GoombaManager();
        this.player = new Player(window.innerWidth / 2, window.innerHeight * 0.67 - ScaleFactor.PLAYER_SIZE, 5.0, 5.0);
    }

    /**
     * Launch the game
     */
    play = (time) => {
        this.player.move(time);
        if (this.player.getPlayerLives() <= 0) {
            alert("Game Over");
        }
        const activeGoombas = this.goombaManager.getActiveGoombas();
        const goombasToMove = activeGoombas.slice(0, 10);
        goombasToMove.forEach(goomba => {
            goomba.move();
        });
        /*
        let goomba = this.levelManager.getCurrentLevel().getGoombas();
        if (goomba && goomba.length > 0) {  // Vérifie si le tableau existe et n'est pas vide
            const goom = goomba.pop();
            goom.createGoomba();
            //goom.move();
            this.movingGoombas.push(goom);
        }*/
        if (!(this.goombaManager.getActiveGoombas().length > 0)){
            this.levelManager.changeLevel();
        }
        requestAnimationFrame(this.play);
    }
}