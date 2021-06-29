import { Game } from './game.js'
import { GameObject } from './gameobject.js'

export class Tutorial extends GameObject {
    private game: Game

    constructor(g: Game) {
        super('tutorial')
        this.game = g

        const text1 = document.createElement('div')
        const btn = document.createElement('button')

        this.div.appendChild(text1)
        this.div.appendChild(btn)

        text1.innerHTML =
            'Je bent een Piraat die op zoek is naar een schatkist' +
            '<br /> maar dan komen er skeletten op je af die je willen uitschakelen.' +
            '<br /> Gelukkig heb je een zwaard waarmee je de skeletten kan uitschakelen.' +
            '<br /> Klik op de SPATIEBALK om je zwaard te kunnen gebruiken. Maar pas op!' +
            '<br /> Je bent een leven kwijt als de skelet je aanraakt' +
            '<br />' +
            '<br /> Jou doel is om 8 skeletten te vermoorden om de level te behalen ' 

        btn.innerText = 'Level 1'

        btn.addEventListener('click', () => this.tutorialScreen())
    }

    private tutorialScreen() {
        this.game.startGame()
        this.div.remove()
    }
}
