import LevelDesign from "./LevelDesign.js";

export class FifthLevel extends LevelDesign {
    constructor() {
        super(10, 247.5, 247.5);
    }

    nextLevel = () => {
        alert("Congratulations! You have completed all level!");
    }
}