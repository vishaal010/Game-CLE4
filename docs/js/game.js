import { Background } from './background.js';
import { Sword } from './sword.js';
import { Enemy } from './enemy.js';
import { Dust } from './dust.js';
import { Player } from './player.js';
import { StartButton } from './startbutton.js';
import { WinScreen } from './winscreen.js';
import { Score } from './score.js';
import { Lives } from './lives.js';
import { Tutorial } from './tutorial.js';
import { Timer } from './timer.js';
import { Deathscreen } from './deathscreen.js';
export class Game {
    constructor() {
        this.enemies = [];
        this.sword = [];
        this.dust = [];
        this.background = new Background();
        this.startScreen();
    }
    startScreen() {
        console.log('test');
        this.startButton = new StartButton(this);
        for (let ene of this.enemies) {
            this.enemies = [];
            this.removeEnemy(ene);
        }
        for (let s of this.sword) {
            this.sword = [];
            this.removeSword(s);
        }
    }
    startGame() {
        this.player = new Player(this);
        this.score = new Score(this);
        this.lives = new Lives(this);
        this.timer = new Timer();
        this.enemies.push(new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy());
        this.gameLoop();
    }
    showTutorial() {
        this.tutorial = new Tutorial(this);
    }
    showWinScreen() {
        this.player.remove();
        this.score.remove();
        this.lives.remove();
        this.counter++;
        for (let ene of this.enemies) {
            this.enemies = [];
            this.removeEnemy(ene);
        }
        this.winScreen = new WinScreen(this);
    }
    showDeathScreen() {
        this.player.remove();
        this.score.remove();
        this.lives.remove();
        console.log(this.enemies.length);
        this.counter++;
        this.gameOver = new Deathscreen(this);
    }
    gameLoop() {
        this.counter = 0;
        this.background.update();
        this.player.update();
        for (let e of this.enemies) {
            e.update();
        }
        for (let s of this.sword) {
            s.update();
        }
        for (let d of this.dust) {
            d.update();
        }
        this.checkSwordCollisions();
        this.checkPlayerCollisions();
        let requestID = requestAnimationFrame(() => this.gameLoop());
        if (this.counter == 1)
            cancelAnimationFrame(requestID);
    }
    checkSwordCollisions() {
        for (let s of this.sword) {
            for (let e of this.enemies) {
                if (this.checkCollision(s.getBoundingRect(), e.getBoundingRect())) {
                    this.addExplosion(e);
                    this.removeSword(s);
                    this.removeEnemy(e);
                    this.score.setScore();
                }
            }
        }
    }
    checkPlayerCollisions() {
        if (this.timer.checkTimer(1.5)) {
            for (let e of this.enemies) {
                if (this.checkCollision(this.player.getBoundingRect(), e.getBoundingRect())) {
                    this.player.addInvincibleIndicator();
                    this.timer.start();
                    this.lives.removeLives();
                    let sound = new Audio('./sound/hit.mp3');
                    sound.play();
                    sound.volume = 0.1;
                }
            }
        }
    }
    addSword() {
        if (this.timer.checkTimer(0.3)) {
            this.timer.start();
            this.sword.push(new Sword(this.player, this));
        }
    }
    removeSword(sword) {
        sword.remove();
        this.sword = this.sword.filter((s) => s !== sword);
    }
    removeEnemy(enemy) {
        enemy.remove();
        console.log('De functie Remove enenmy word 1 x aangeropen');
        this.enemies = this.enemies.filter((e) => e !== enemy);
    }
    addExplosion(e) {
        this.dust.push(new Dust(e, this));
    }
    removeExplosion(dust) {
        dust.remove();
        this.dust = this.dust.filter((e) => e !== dust);
    }
    checkCollision(a, b) {
        return a.left <= b.right && b.left <= a.right && a.top <= b.bottom && b.top <= a.bottom;
    }
}
new Game();
//# sourceMappingURL=game.js.map