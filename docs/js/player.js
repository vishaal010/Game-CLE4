import { GameObject } from './gameobject.js';
export class Player extends GameObject {
    constructor(g) {
        super('player');
        this.horizontalSpeed = 0;
        this.frames = 2;
        this.frame = 0;
        this.framewidth = 43;
        this.speedcounter = 0;
        this.row = 0;
        this.element = document.getElementsByTagName('player')[0];
        this.game = g;
        window.addEventListener('keydown', (e) => this.onKeyDown(e));
        window.addEventListener('keyup', (e) => this.onKeyUp(e));
        this.x = 150;
        this.y = window.innerHeight - 175;
    }
    update() {
        this.x += this.horizontalSpeed;
        this.speedcounter++;
        if (this.speedcounter % 14 == 0)
            this.frame++;
        if (this.frame >= this.frames)
            this.frame = 0;
        let pos = 0 - this.frame * this.framewidth;
        this.element.style.backgroundPosition = `${pos}px ${0 - this.row * 111}px`;
        super.update();
    }
    onKeyDown(e) {
        switch (e.key) {
            case ' ':
                break;
            case 'ArrowLeft':
                this.horizontalSpeed = -5;
                break;
            case 'ArrowRight':
                this.horizontalSpeed = 5;
                break;
        }
    }
    onKeyUp(e) {
        if (e.key === ' ') {
            this.game.addSword();
        }
        if (e.key == 'ArrowRight' || e.key == 'ArrowLeft') {
            this.horizontalSpeed = 0;
        }
    }
    addInvincibleIndicator() {
        this.element.style.border = ' 1px solid red';
        setTimeout(() => {
            this.element.style.border = 'none';
        }, 1500);
    }
}
//# sourceMappingURL=player.js.map