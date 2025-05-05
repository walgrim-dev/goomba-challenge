import Coordinates from "../tile/coordinates/Coordinates.js";
import {ActionType} from "../action/Action.js";

export default class DefaultObstacle {
    /**
     * @param {float} x X coordinate of the obstacle
     * @param {float} y Y coordinate of the obstacle
     * @param {float} vx X velocity of the obstacle
     * @param {float} vy Y velocity of the obstacle
     * @param {ActionType} action Action of the obstacle
     * @param {number} size Size of the obstacle
     */

    constructor(x, y, vx, vy, action, size) {
        this.coordinates = new Coordinates(x, y, vx, vy);
        this.action = action;
        this.size = size;
    }

    move(delta) {
        //const vx = calculateDistanceToMove(delta, this.coordinates.vx);
        //const vy = calculateDistanceToMove(delta, this.coordinates.vy);
        if (this.coordinates.x < 0 || this.coordinates.x > window.innerWidth - this.size) {
            this.coordinates.vx = -this.coordinates.vx;
        }
        if (this.coordinates.y < 0) {
            this.coordinates.vy = -this.coordinates.vy;
        }
        this.coordinates.x += this.coordinates.vx;
        this.coordinates.y += this.coordinates.vy;
    }
}