import { GameObject } from './gameobject.js';
export class Dust extends GameObject {
    constructor(enemy, game) {
        super('dust');
        this.game = game;
        let sound = new Audio('./sound/skeletondead.mp3');
        sound.play();
        sound.volume = 0.1;
        this.update();
    }
    update() {
        this.game.removeExplosion(this);
    }
}
//# sourceMappingURL=dust.js.map