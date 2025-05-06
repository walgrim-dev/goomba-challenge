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
        this.createLifeCounter();
    }

    createPlayer() {
        this.element.classList.add('player');
        this.element.style.width = `${this.size}px`;
        this.element.style.height = `${this.size}px`;
        this.element.style.left = `${this.coordinates.x}px`;
        this.element.style.top = `${this.coordinates.y}px`;
        document.querySelector('#app').append(this.element);
    }

    createLifeCounter() {
        // Création du conteneur de vies
        const livesContainer = document.createElement('div');
        livesContainer.id = 'lives-container';
        livesContainer.style.position = 'absolute';
        livesContainer.style.top = '20px';
        livesContainer.style.left = '20px';
        livesContainer.style.display = 'flex';
        livesContainer.style.gap = '5px';
        livesContainer.style.zIndex = '1000';

        // Ajout de l'icône Mario
        const marioIcon = document.createElement('div');
        marioIcon.style.width = '30px';
        marioIcon.style.height = '30px';
        marioIcon.style.backgroundImage = 'url("/goomba-challenge/img/mario.png")';
        marioIcon.style.backgroundSize = 'contain';
        marioIcon.style.backgroundRepeat = 'no-repeat';
        marioIcon.style.marginRight = '10px';

        // Ajout du x (multiplication)
        const multiplySymbol = document.createElement('div');
        multiplySymbol.textContent = '×';
        multiplySymbol.style.fontFamily = '"Press Start 2P", cursive';
        multiplySymbol.style.fontSize = '20px';
        multiplySymbol.style.color = 'white';
        multiplySymbol.style.textShadow = '2px 2px 0 #000';
        multiplySymbol.style.marginRight = '10px';
        multiplySymbol.style.display = 'flex';
        multiplySymbol.style.alignItems = 'center';

        // Ajout de l'affichage du nombre de vies
        this.livesDisplay = document.createElement('div');
        this.livesDisplay.textContent = this.lives;
        this.livesDisplay.style.fontFamily = '"Press Start 2P", cursive';
        this.livesDisplay.style.fontSize = '20px';
        this.livesDisplay.style.color = 'white';
        this.livesDisplay.style.textShadow = '2px 2px 0 #000';
        this.livesDisplay.style.display = 'flex';
        this.livesDisplay.style.alignItems = 'center';

        // Assemblage des éléments
        livesContainer.appendChild(marioIcon);
        livesContainer.appendChild(multiplySymbol);
        livesContainer.appendChild(this.livesDisplay);

        // Ajout au DOM
        document.querySelector('#app').appendChild(livesContainer);

        // Importation de la police Press Start 2P
        const fontLink = document.createElement('link');
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap';
        fontLink.rel = 'stylesheet';
        document.head.appendChild(fontLink);
    }

    updateLifeCounter() {
        if (this.livesDisplay) {
            this.livesDisplay.textContent = this.lives;

            // Animation de clignotement quand on perd une vie
            this.livesDisplay.style.animation = 'none';
            setTimeout(() => {
                this.livesDisplay.style.animation = 'blink 0.5s 3';
            }, 10);

            // Ajout d'une règle CSS pour l'animation si elle n'existe pas déjà
            if (!document.getElementById('lives-animation-style')) {
                const style = document.createElement('style');
                style.id = 'lives-animation-style';
                style.textContent = `
                    @keyframes blink {
                        0% { opacity: 1; }
                        50% { opacity: 0; }
                        100% { opacity: 1; }
                    }
                `;
                document.head.appendChild(style);
            }
        }
    }

    listenToKeys() {
        addEventListener('keydown', (ev) => {
            ev.preventDefault();
            if (ev.key === 'q' || ev.key === 'Q' || ev.key === 'ArrowLeft') {
                this.moves.left = true;
            }
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

    isMoving() {
        return (this.moves.up || this.moves.down || this.moves.left || this.moves.right);
    }

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
            if (this.moves.left) {
                if (this.coordinates.x - this.coordinates.vx < 0) {
                    return;
                }
                this.coordinates.x -= this.coordinates.vx;
            }
            if (this.moves.right) {
                if (this.coordinates.x > window.innerWidth - this.size) {
                    return;
                }
                this.coordinates.x += this.coordinates.vx;
            }
            this.element.style.left = `${this.coordinates.x}px`;
        }
        const collidingObstacle = this.isColliding();
        if (collidingObstacle) {
            collidingObstacle.deleteElement();
            this.goombaManager.makeActiveInactiveGoomba(collidingObstacle);
            this.lives--;
            this.updateLifeCounter();
        }
    }

    getPlayerLives() {
        return this.lives;
    }
}