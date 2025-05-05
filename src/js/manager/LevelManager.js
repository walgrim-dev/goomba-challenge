import FirstLevel from "../level/FirstLevel.js";

export default class LevelManager {
    static instance = null;

    constructor() {
        if (LevelManager.instance) {
            return LevelManager.instance;
        }
        LevelManager.instance = this;
        this.currentLevel = new FirstLevel();
    }

    getCurrentLevel() {
        return this.currentLevel;
    }

    changeLevel() {
        this.currentLevel = this.currentLevel.nextLevel();
    }
}