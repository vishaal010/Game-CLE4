import { Game } from './game.js'
import { GameObject } from './gameobject.js'

export class Score extends GameObject {
    private game: Game
    private score: number 

    constructor(g: Game) {
        super('score')
        this.score = 0
        this.game = g
        this.div.innerHTML = 'Kill 0'
        console.log('je hebt' + this.score)
    }

    public setScore() {
        this.score++
        this.div.innerHTML = 'Kill ' + this.score
        if (this.score === 8) {
            this.score = 0
            this.remove()
            let sound = new Audio('./sound/win.mp3')
            sound.play()
            sound.volume = 0.1
            this.game.showWinScreen()
        }
    }
}
