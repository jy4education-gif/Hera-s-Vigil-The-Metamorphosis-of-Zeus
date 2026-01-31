import GameObject from './GameObject.js';

class HorizontalEntity extends GameObject {
    constructor(y, speed) {
        super(window.innerWidth / 2, y, speed);
        this.direction = 1;
    }
    update() {
        this.x += this.speed * this.direction;
        if (this.x > window.innerWidth - 50 || this.x < 50) this.direction *= -1;
    }
}

export class Zeus extends HorizontalEntity {
    constructor() { super(160, 4); }
    draw(ctx) {
        ctx.font = "50px serif";
        ctx.fillText("⚡", this.x, this.y);
    }
}

export class Hera extends HorizontalEntity {
    constructor() { super(200, 3.5); }
    update(targetX) { // Hera verfolgt Zeus!
        if (this.x < targetX) this.x += this.speed;
        else if (this.x > targetX) this.x -= this.speed;
    }
    draw(ctx) {
        ctx.font = "45px serif";
        ctx.fillText("👸", this.x, this.y);
    }
}