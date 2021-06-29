import { GameObject } from './gameobject.js';
export class Sword extends GameObject {
    constructor(player, g) {
        super('sword');
        this.game = g;
        this.frames = 2;
        this.frame = 0;
        this.framewidth = 100;
        this.speedcounter = 10;
        this.row = 1;
        let sound = new Audio('./sound/knife.mp3');
        sound.play();
        sound.volume = 0.1;
        this.frame = 0;
        this.element = document.getElementsByTagName('sword')[0];
        this.x = player.getBoundingRect().right - 40;
        this.y = player.getBoundingRect().top - 70;
    }
    update() {
        setTimeout(() => {
            this.game.removeSword(this);
        }, 200);
        this.speedcounter++;
        if (this.speedcounter % 14 == 0)
            this.frame++;
        if (this.frame >= this.frames)
            this.frame = 0;
        let pos = 0 - this.frame * this.framewidth;
        this.element.style.backgroundPosition = `${pos}px ${0 - this.row * 111}px`;
        super.update();
    }
}
//# sourceMappingURL=sword.js.map