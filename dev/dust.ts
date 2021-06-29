import { Enemy } from './enemy.js'
import { Game } from './game.js'
import { GameObject } from './gameobject.js'

export class Dust extends GameObject {
    private game: Game

    constructor(enemy: Enemy, game: Game) {
        super('dust')
        this.game = game
        let sound = new Audio('./sound/skeletondead.mp3')
        sound.play()
        sound.volume = 0.1
        //   this.x = enemy.getBoundingRect().left
        //   this.y = enemy.getBoundingRect().top
        this.update()
    }

    public update() {
        // this.speedcounter++
        // if (this.speedcounter % 14 == 0) this.frame++
        // if (this.frame >= this.frames) this.frame = 1
        // let pos = 0 - this.frame * this.framewidth

        // this.div.style.backgroundPosition = `${pos}px ${0 - this.row * 111}px`
        this.game.removeExplosion(this)
    }
}
