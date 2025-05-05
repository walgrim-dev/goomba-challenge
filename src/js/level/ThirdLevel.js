import LevelDesign from "./LevelDesign.js";
import {SecondLevel} from "./SecondLevel.js";
import {FourthLevel} from "./FourthLevel.js";

export class ThirdLevel extends LevelDesign {
    constructor() {
        super(10, 247.5, 247.5);
    }

    nextLevel = () => {
        return new FourthLevel();
    }
}