import { GameObject } from './gameobject.js';
export class StartButton extends GameObject {
    constructor(g) {
        super('startbutton');
        this.game = g;
        const text = document.createElement('div');
        const btn = document.createElement('button');
        this.div.appendChild(text);
        this.div.appendChild(btn);
        text.innerText = 'Pirate Rush';
        btn.innerText = 'Start Game';
        btn.addEventListener('click', () => this.showTutorial());
    }
    showTutorial() {
        this.game.showTutorial();
        this.div.remove();
    }
}
//# sourceMappingURL=startbutton.js.map