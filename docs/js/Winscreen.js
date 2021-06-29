import { GameObject } from './gameobject.js';
export class WinScreen extends GameObject {
    constructor(game) {
        super('endscreen');
        this.game = game;
        const text = document.createElement('div');
        const btn = document.createElement('button');
        this.div.appendChild(text);
        this.div.appendChild(btn);
        text.innerText = 'Great job';
        btn.innerText = 'Back to home';
        btn.addEventListener('click', () => this.backToStart());
    }
    backToStart() {
        this.game.startScreen();
        this.div.remove();
    }
}
//# sourceMappingURL=Winscreen.js.map