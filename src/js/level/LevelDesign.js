import GoombaObstacle from "../obstacles/GoombaObstacle.js";
import GoombaManager from "../manager/GoombaManager.js";
import {ScaleFactor} from "../scale/ScaleFactor.js";

export default class LevelDesign {
    /**
     * @param {number} numberOfGoombas
     * @param {float} maxVel
     * @param {float} minVel
     */
    constructor(numberOfGoombas, maxVel, minVel) {
        this.goombaManager = new GoombaManager();
        this.initGoombas(numberOfGoombas, maxVel, minVel);
    }

    /**
     * @param {number} numberOfGoombas
     * @param {float} maxVel
     * @param {float} minVel
     */
    initGoombas = (numberOfGoombas, maxVel, minVel) => {
        const padding = ScaleFactor.GOOMBA_SIZE;

        for (let i = 0; i < numberOfGoombas; i++) {
            const xRange = window.innerWidth - 2 * padding;
            const x = padding + Math.random() * xRange;
            const y = - (Math.random() * window.innerHeight);

            const angleDeg = 75 + Math.random() * 30; // range: 75° to 105°
            const angleRad = angleDeg * Math.PI / 180;
            const speed = minVel + Math.random() * (maxVel - minVel);

            const vx = Math.cos(angleRad) * speed;
            const vy = Math.sin(angleRad) * speed;

            const goomba = new GoombaObstacle(x, y, vx, vy);
            goomba.oscillationSpeed = 0.05 + Math.random() * 0.05;
            goomba.createGoomba();
            this.goombaManager.addActiveGoomba(goomba);
        }
    }

    /*
    getPlayerStartingPos = () => {
        if (this.basicPlayerPos === null) {
            throw new Error("Player position is not defined");
        }
        const playerPos = {};
        Object.assign(playerPos, this.basicPlayerPos);
        return playerPos;
    }*/
}