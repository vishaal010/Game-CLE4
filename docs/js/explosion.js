import { GameObject } from './gameobject.js';
export class Dust extends GameObject {
    constructor(enemy, game) {
        super('explosion');
        this.scale = 0.5;
        this.opacity = 2;
        this.game = game;
        let sound = new Audio('./sound/skeletondead.mp3');
        sound.play();
        sound.volume = 0.1;
        this.x = enemy.getBoundingRect().left;
        this.y = enemy.getBoundingRect().top;
        this.update();
    }
    update() {
        this.scale += 0.02;
        this.opacity -= 0.02;
        if (this.scale > 2.2) {
            this.game.removeExplosion(this);
        }
        this.div.style.opacity = this.opacity.toString();
        this.div.style.transform = `translate(${this.x}px, ${this.y}px) scale(${this.scale})`;
    }
    removeExpolosion() {
        this.div.remove();
    }
}
//# sourceMappingURL=explosion.js.map