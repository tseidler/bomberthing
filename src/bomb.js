import {CHAR_WIDTH, CHAR_HEIGHT} from './consts';

export default class Bomb {
    constructor(x, y, sprite) {
        this.sprite = sprite;
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.width = CHAR_WIDTH;
        this.sprite.height = CHAR_HEIGHT;
        this.lifetime = 1000 * Math.random() + 2500;    
    }

    update(elapsedTime) {
        this.lifetime = Math.max(0, this.lifetime - elapsedTime);
    }

    isDead() {
        return this.lifetime === 0;
    }
}
