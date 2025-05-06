import LevelDesign from "./LevelDesign.js";
import {ThirdLevel} from "./ThirdLevel.js";

export class SecondLevel extends LevelDesign {
    constructor() {
        super(50, 10, 5.0);
    }
    nextLevel = () => {
        return new ThirdLevel();
    }

}