import { Game } from './game.js'
import { GameObject } from './gameobject.js'

export class StartButton extends GameObject {
    private game: Game

    constructor(g: Game) {
        super('startbutton')
        this.game = g
        const text = document.createElement('div')
        const btn = document.createElement('button')

        this.div.appendChild(text)
        this.div.appendChild(btn)

        text.innerText = 'Pirate Rush'
        btn.innerText = 'Start Game'

        btn.addEventListener('click', () => this.showTutorial())
    }

    private showTutorial() {
        this.game.showTutorial()
        this.div.remove()
    }
}
