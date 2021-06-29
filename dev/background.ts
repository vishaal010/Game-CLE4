import { GameObject } from './gameobject.js'

export class Background extends GameObject {
    constructor() {
        super('background')
        this.x = 0
    }

    public update() {}
}
