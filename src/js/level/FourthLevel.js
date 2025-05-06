import LevelDesign from "./LevelDesign.js";
import {FifthLevel} from "./FifthLevel.js";

export class FourthLevel extends LevelDesign {
    constructor() {
        super(150, 14.0, 7.0);
    }
    nextLevel = () => {
        return new FifthLevel();
    }
}
