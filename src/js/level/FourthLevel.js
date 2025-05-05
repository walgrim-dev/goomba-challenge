import LevelDesign from "./LevelDesign.js";
import {FifthLevel} from "./FifthLevel.js";

export class FourthLevel extends LevelDesign {
    constructor() {
        super(10, 247.5, 247.5);
    }
    nextLevel = () => {
        return new FifthLevel(this.canvas, this.ctx);
    }
}
