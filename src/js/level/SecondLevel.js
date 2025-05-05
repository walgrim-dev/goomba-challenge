import LevelDesign from "./LevelDesign.js";
import {ThirdLevel} from "./ThirdLevel.js";

export class SecondLevel extends LevelDesign {
    constructor() {
        super(10, 247.5, 247.5);
    }
    nextLevel = () => {
        return new ThirdLevel();
    }

}