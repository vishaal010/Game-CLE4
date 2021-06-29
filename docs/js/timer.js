export class Timer {
    constructor() {
        this.time = 0;
    }
    start() {
        this.time = this.getUNIX();
    }
    getUNIX() {
        return Math.round(new Date().getTime() / 1000);
    }
    checkTimer(diff) {
        return this.time === 0 ? true : this.getUNIX() - this.time >= diff;
    }
}
//# sourceMappingURL=timer.js.map