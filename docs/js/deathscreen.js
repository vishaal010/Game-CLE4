import { GameObject } from './gameobject.js';
export class Deathscreen extends GameObject {
    constructor(game) {
        super('deathscreen');
        this.game = game;
        const text = document.createElement('div');
        const btn = document.createElement('button');
        this.div.appendChild(text);
        this.div.appendChild(btn);
        text.innerText = 'Game Over';
        btn.innerText = 'Back to home';
        btn.addEventListener('click', () => this.backToStart());
    }
    backToStart() {
        this.game.startScreen();
        this.div.remove();
    }
}
//# sourceMappingURL=deathscreen.js.map