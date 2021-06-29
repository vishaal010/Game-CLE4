export class Timer {
    time: number 

    constructor() {
        this.time = 0
    }

    public start() {
        this.time = this.getUNIX()
    }

    public getUNIX(): number {
        return Math.round(new Date().getTime() / 1000)
    }

    public checkTimer(diff: number): boolean {
        return this.time === 0 ? true : this.getUNIX() - this.time >= diff
    }
}
