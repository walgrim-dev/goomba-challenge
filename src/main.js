import './css/style.css'
import GameEngine from "./js/game/GameEngine.js";

/**
 * On load
 */
window.onload = exec;

async function exec() {
    const gameEngine = new GameEngine();
    gameEngine.play();
}

