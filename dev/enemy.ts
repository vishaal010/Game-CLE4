import { GameObject } from './gameobject.js'

export class Enemy extends GameObject {
    private speed: number 

    constructor() {
        super('enemy')

        this.speed = 0
        this.frames = 4
        this.frame = 0
        this.framewidth = 70
        this.speedcounter = 0
        this.row = 0.15

        this.element = document.getElementsByTagName('enemy')[0]! as HTMLElement
        this.resetEnemy()
    }

    private resetEnemy() {
        this.x = window.innerWidth + Math.random() * 200
        this.y = -160 + (window.innerHeight - this.div.clientHeight)
        this.speed = Math.random() * 2 + 1
        this.element.style.backgroundPosition = `${Math.floor(Math.random() * 5000)}px`

        this.update()
    }

    public update(): void {
        this.x -= this.speed
        if (this.x < -100) {
            this.resetEnemy()
        }

        this.speedcounter++
        if (this.speedcounter % 14 == 0) this.frame++
        if (this.frame >= this.frames) this.frame = 1
        let pos = 0 - this.frame * this.framewidth

        this.div.style.backgroundPosition = `${pos}px ${0 - this.row * 111}px`
        this.div.style.transform = `translate(${this.x}px, ${this.y}px)`
    }
}
