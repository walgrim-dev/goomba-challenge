import LevelDesign from "./LevelDesign.js";
import {SecondLevel} from "./SecondLevel.js";

class FirstLevel extends LevelDesign {
    constructor() {
        super(10, 3.0, 1.0);
    }

    nextLevel = () => {
        return new SecondLevel();
    }
}

export default FirstLevel;