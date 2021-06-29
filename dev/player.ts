import { Game } from './game.js'
import { GameObject } from './gameobject.js'
import { Timer } from './timer.js'

export class Player extends GameObject {
    private horizontalSpeed: number = 0
    private game: Game

    constructor(g: Game) {
        super('player')
        this.frames = 2
        this.frame = 0
        this.framewidth = 43
        this.speedcounter = 0
        this.row = 0

        this.element = document.getElementsByTagName('player')[0]! as HTMLElement
        this.game = g
        window.addEventListener('keydown', (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener('keyup', (e: KeyboardEvent) => this.onKeyUp(e))

        this.x = 150
        this.y = window.innerHeight - 175
    }

    public update(): void {
        this.x += this.horizontalSpeed

        this.speedcounter++
        if (this.speedcounter % 14 == 0) this.frame++
        if (this.frame >= this.frames) this.frame = 0
        let pos = 0 - this.frame * this.framewidth
        this.element.style.backgroundPosition = `${pos}px ${0 - this.row * 111}px`

        super.update()
    }

    private onKeyDown(e: KeyboardEvent): void {
        switch (e.key) {
            case ' ':
                break
            case 'ArrowLeft':
                this.horizontalSpeed = -5
                break
            case 'ArrowRight':
                this.horizontalSpeed = 5
                break
        }
    }

    private onKeyUp(e: KeyboardEvent): void {
        if (e.key === ' ') {
            this.game.addSword()
        }
        if (e.key == 'ArrowRight' || e.key == 'ArrowLeft') {
            this.horizontalSpeed = 0
        }
    }

    public addInvincibleIndicator() {
        this.element.style.border = ' 1px solid red'
        setTimeout(() => {
            this.element.style.border = 'none'
        }, 1500)
    }
}
