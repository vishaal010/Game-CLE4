import { GameObject } from './gameobject.js';
export class Score extends GameObject {
    constructor(g) {
        super('score');
        this.score = 0;
        this.game = g;
        this.div.innerHTML = 'Kill 0';
        console.log('je hebt' + this.score);
    }
    setScore() {
        this.score++;
        this.div.innerHTML = 'Kill ' + this.score;
        if (this.score === 8) {
            this.score = 0;
            this.remove();
            let sound = new Audio('./sound/win.mp3');
            sound.play();
            sound.volume = 0.1;
            this.game.showWinScreen();
        }
    }
}
//# sourceMappingURL=score.js.map