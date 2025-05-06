import {objectColliding} from "../collisions/checkCollisions.js";
import Coordinates from "../tile/coordinates/Coordinates.js";
import {ScaleFactor} from "../scale/ScaleFactor.js";
import LevelManager from "../manager/LevelManager.js";
import GoombaManager from "../manager/GoombaManager.js";

export default class Player {
    /**
     * @param {number} x X coordinate of the player
     * @param {number} y Y coordinate of the player
     * @param {number} vx X velocity of the player
     * @param {number} vy Y velocity of the player
     */
    constructor(x, y, vx, vy) {
        this.coordinates = new Coordinates(x, y, vx, vy);
        this.element = document.createElement('div');
        this.moves = {
            up: false,
            down: false,
            left: false,
            right: false
        };
        this.size = ScaleFactor.PLAYER_SIZE;
        this.listenToKeys();
        this.createPlayer();
        this.goombaManager = new GoombaManager();
        this.lives = 3;
        //this.loaded = true
    }

    createPlayer() {
        this.element.classList.add('player');
        this.element.style.width = `${this.size}px`;
        this.element.style.height = `${this.size}px`;
        this.element.style.left = `${this.coordinates.x}px`;
        this.element.style.top = `${this.coordinates.y}px`;
        document.querySelector('#app').append(this.element);
    }

    listenToKeys() {
        addEventListener('keydown', (ev) => {
            ev.preventDefault();
            /*
            if (ev.key === 'z' || ev.key === 'Z' || ev.key === 'ArrowUp') {
                this.moves.up = true;
                this.action = ActionType.MOVE_RIGHT;
            }*/
            if (ev.key === 'q' || ev.key === 'Q' || ev.key === 'ArrowLeft') {
                this.moves.left = true;
            }
            /*
            else if (ev.key === 's' || ev.key === 'S' || ev.key === 'ArrowDown') {
                this.moves.down = true;
                this.action = ActionType.MOVE_RIGHT;
            }*/
            else if (ev.key === 'd' || ev.key === 'D' || ev.key === 'ArrowRight') {
                this.moves.right = true;
            }
        });

        addEventListener('keyup', (ev) => {
            ev.preventDefault();
            if (ev.key === 'z' || ev.key === 'Z' || ev.key === 'ArrowUp') this.moves.up = false;
            else if (ev.key === 'q' || ev.key === 'Q' || ev.key === 'ArrowLeft') this.moves.left = false;
            else if (ev.key === 's' || ev.key === 'S' || ev.key === 'ArrowDown') this.moves.down = false;
            else if (ev.key === 'd' || ev.key === 'D' || ev.key === 'ArrowRight') this.moves.right = false;
        });
    }

    /**
     * @returns {boolean}
     */
    isMoving() {
        return (this.moves.up || this.moves.down || this.moves.left || this.moves.right);
    }

    /**
     * @returns {GoombaObstacle|null} obstacle
     */

    isColliding() {
        return objectColliding(
            this.coordinates.x,
            this.coordinates.y,
            this.size,
            this.size,
            this.goombaManager.getActiveGoombas());
    }

    move(delta) {
        if (this.isMoving()) {
            // Tileinfo
            if (this.moves.left) {
                if (this.coordinates.x - this.coordinates.vx < 0) {
                    return;
                }
                this.coordinates.x -= this.coordinates.vx;
                /*
                const collidingObstacle = this.isColliding();
                if (collidingObstacle) {
                    alert("Collision with obstacle");
                }*/
            }
            if (this.moves.right) {
                if (this.coordinates.x > window.innerWidth - this.size) {
                    return;
                }
                this.coordinates.x += this.coordinates.vx;
                /*
                const collidingObstacle = this.isColliding();
                if (collidingObstacle) {
                    alert("Collision with obstacle");
                }*/
            }
            this.element.style.left = `${this.coordinates.x}px`;
        }
        const collidingObstacle = this.isColliding();
        if (collidingObstacle) {
            collidingObstacle.deleteElement();
            this.goombaManager.makeActiveInactiveGoomba(collidingObstacle);
            this.lives--;
        }
    }

    getPlayerLives() {
        return this.lives;
    }
}