import GoombaObstacle from "../obstacles/GoombaObstacle.js";

export default class LevelDesign {
    /**
     * @param {number} numberOfGoombas
     * @param {float} maxVel
     * @param {float} minVel
     */
    constructor(numberOfGoombas, maxVel, minVel) {
        this.goombas = [];
        this.basicPlayerPos = null;
        this.initGoombas(numberOfGoombas, maxVel, minVel);
    }

    /**
     * @param {number} numberOfGoombas
     * @param {float} maxVel
     * @param {float} minVel
     */
    initGoombas = (numberOfGoombas, maxVel, minVel) => {
        for (let i = 0; i < numberOfGoombas; i++) {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight/3;
            const vx = Math.random() * maxVel - Math.random() * minVel;
            const vy = Math.random() * maxVel + Math.random() * minVel;
            const goomba = new GoombaObstacle(x, y, vx, vy);
            this.goombas.push(goomba);
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

    /**
     *
     * @returns {GoombaObstacle []}
     */
    getGoombas = () => {
        return this.goombas;
    }
}