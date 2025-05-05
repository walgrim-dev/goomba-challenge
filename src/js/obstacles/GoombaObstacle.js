import DefaultObstacle from "./DefaultObstacle.js";
import {ScaleFactor} from "../scale/ScaleFactor.js";

export default class GoombaObstacle extends DefaultObstacle {
    /**
     * @param {float} x X coordinate of the obstacle
     * @param {float} y Y coordinate of the obstacle
     * @param {float} vx X velocity of the obstacle
     * @param {float} vy Y velocity of the obstacle
     * @param {string} action Action of the obstacle
     */
    constructor(x, y, vx, vy, action) {
        super(x, y, vx, vy, action, ScaleFactor.GOOMBA_SIZE);
        this.element = document.createElement('div');
    }

    move(delta) {
        super.move(delta);
        if (parseInt(this.element.style.bottom) < 0) {
            this.element.remove();
        }
        this.element.style.top = `${this.coordinates.y}px`;
        this.element.style.left = `${this.coordinates.x}px`;
    }

    createGoomba() {
        this.element.classList.add('goomba');
        this.element.style.width = `${this.size}px`;
        this.element.style.height = `${this.size}px`;
        this.element.style.top = `${this.coordinates.y}px`;
        this.element.style.left = `${this.coordinates.x}px`;
        document.querySelector('#app').append(this.element);
    }
}