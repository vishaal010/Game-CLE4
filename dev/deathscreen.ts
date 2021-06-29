import { Game } from './game.js'
import { GameObject } from './gameobject.js'

export class Deathscreen extends GameObject {
    private game: Game

    constructor(game: Game) {
        super('deathscreen')

        this.game = game

        const text = document.createElement('div')
        const btn = document.createElement('button')

        this.div.appendChild(text)
        this.div.appendChild(btn)

        text.innerText = 'Game Over'
        btn.innerText = 'Back to home'

        btn.addEventListener('click', () => this.backToStart())
    }

    private backToStart() {
        this.game.startScreen()
        this.div.remove()
    }
}
