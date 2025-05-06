import LevelDesign from "./LevelDesign.js";
import {SecondLevel} from "./SecondLevel.js";
import {FourthLevel} from "./FourthLevel.js";

export class ThirdLevel extends LevelDesign {
    constructor() {
        super(100, 12.0, 7.0);
    }

    nextLevel = () => {
        return new FourthLevel();
    }
}