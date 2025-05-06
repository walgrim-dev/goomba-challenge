import DefaultObstacle from "./DefaultObstacle.js";
import {ScaleFactor} from "../scale/ScaleFactor.js";
import GoombaManager from "../manager/GoombaManager.js";

export default class GoombaObstacle extends DefaultObstacle {
    /**
     * @param {float} x X coordinate of the obstacle
     * @param {float} y Y coordinate of the obstacle
     * @param {float} vx X velocity of the obstacle
     * @param {float} vy Y velocity of the obstacle
     */
    constructor(x, y, vx, vy) {
        super(x, y, vx, vy, ScaleFactor.GOOMBA_SIZE);
        this.element = document.createElement('div');
        this.goombaManager = new GoombaManager();
    }

    move = (delta) => {
        super.move(delta);
        if (this.coordinates.y > window.innerHeight) {
            this.goombaManager.makeActiveInactiveGoomba(this);
            this.deleteElement();
            return;
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

    deleteElement() {
        this.element.remove();
    }
}