import { GameObject } from "./gameobject.js";
export class Bullet extends GameObject {
    constructor(player, g) {
        super("bullet");
        this.speed = 3;
        this.frames = 2;
        this.frame = 0;
        this.framewidth = 100;
        this.speedcounter = 10;
        this.row = 1;
        let sound = new Audio("./sound/knife.mp3");
        sound.play();
        this.game = g;
        this.frame = 0;
        this.element = document.getElementsByTagName("bullet")[0];
        this.x = player.getBoundingRect().right - 30;
        this.y = player.getBoundingRect().top - 65;
    }
    update() {
        if (this.x > window.innerWidth) {
            this.game.removeBullet(this);
        }
        setTimeout(() => {
            this.game.removeBullet(this);
        }, 200);
        
        this.speedcounter++;
        if (this.speedcounter % 14 == 0)
            this.frame++;
        if (this.frame >= this.frames)
            this.frame = 0;
        let pos = 0 - (this.frame * this.framewidth);
        this.element.style.backgroundPosition = `${pos}px ${0 - this.row * 111}px`;
        super.update();
    }
    removeBullet() {
        this.div.remove();
    }
}
//# sourceMappingURL=bullet.js.map