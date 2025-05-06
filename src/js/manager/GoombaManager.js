export default class GoombaManager {
    static instance = null;
    constructor() {
        if (GoombaManager.instance) {
            return GoombaManager.instance;
        }
        GoombaManager.instance = this;
        this.activeGoombas = [];
        this.inactiveGoombas = [];
    }

    getActiveGoombas() {
        return this.activeGoombas;
    }

    getInactiveGoombas() {
        return this.inactiveGoombas;
    }

    addActiveGoomba(goomba) {
        console.log(goomba);
        this.activeGoombas.push(goomba);
    }

    addInactiveGoombas(goomba) {
        this.inactiveGoombas.push(goomba);
    }

    makeInactiveActiveGoomba(activeGoomba) {
        const index = this.inactiveGoombas.findIndex(goomba => goomba === activeGoomba);
        if (index !== -1) {
            const [poppedGoomba] = this.inactiveGoombas.splice(index, 1);
            this.activeGoombas.push(poppedGoomba);
        }
        return this.inactiveGoombas;
    }

    makeActiveInactiveGoomba(goomba) {
        const index = this.activeGoombas.findIndex(g => g === goomba);
        if (index !== -1) {
            const [poppedGoomba] = this.activeGoombas.splice(index, 1);
            this.inactiveGoombas.push(poppedGoomba);
        }
        return this.activeGoombas;
    }

    purgeAllGoombas() {
        this.inactiveGoombas = [];
        this.activeGoombas = [];
    }
}