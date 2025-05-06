import Coordinates from "../tile/coordinates/Coordinates.js";

export default class DefaultObstacle {
    /**
     * @param {float} x X coordinate of the obstacle
     * @param {float} y Y coordinate of the obstacle
     * @param {float} vx X velocity of the obstacle
     * @param {float} vy Y velocity of the obstacle
     * @param {number} size Size of the obstacle
     */

    constructor(x, y, vx, vy, size) {
        this.coordinates = new Coordinates(x, y, vx, vy);
        this.size = size;
    }

    move(delta) {
        //const vx = calculateDistanceToMove(delta, this.coordinates.vx);
        //const vy = calculateDistanceToMove(delta, this.coordinates.vy);
        if (this.coordinates.x < 0 || this.coordinates.x > window.innerWidth - this.size) {
            this.coordinates.vx = -this.coordinates.vx;
        }
        /*
        if (this.coordinates.y < 0) {
            this.coordinates.vy = -this.coordinates.vy;
        }*/
        this.coordinates.x += this.coordinates.vx;
        this.coordinates.y += this.coordinates.vy;
    }
}