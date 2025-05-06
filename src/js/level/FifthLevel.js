import LevelDesign from "./LevelDesign.js";

export class FifthLevel extends LevelDesign {
    constructor() {
        super(200, 15.0, 7.0);
    }

    nextLevel = () => {
        alert("Congratulations! You have completed all level!");
    }
}