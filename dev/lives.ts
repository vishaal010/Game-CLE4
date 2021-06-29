import { Game } from './game.js'
import { GameObject } from './gameobject.js'

export class Lives extends GameObject {
    private game: Game
    private lives: number 

    constructor(g: Game) {
        super('lives')
        this.lives = 3
        this.game = g
        this.div.innerHTML = 'Lives ' + this.lives
    }

    public removeLives() {
        this.lives--
        this.div.innerHTML = 'Lives ' + this.lives
        console.log('Mijn leven is nu' + this.lives)
        if (this.lives === 0) {
            this.lives = 3
            this.remove()
            let sound = new Audio('./sound/dead.mp3')
            sound.play()
            sound.volume = 0.1
            this.game.showDeathScreen()
        }
    }
}
