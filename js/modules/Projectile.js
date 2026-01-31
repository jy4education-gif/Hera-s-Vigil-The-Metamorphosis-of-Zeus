import GameObject from './GameObject.js';

export default class Projectile extends GameObject {
    constructor(x, y, code) {
        super(x, y, 8);
        this.code = code;
    }
    update() {
        this.y -= this.speed;
        if (this.y < 0) this.active = false;
    }
    draw(ctx) {
        ctx.fillStyle = "#00ffcc";
        ctx.font = "bold 16px monospace";
        ctx.fillText(this.code, this.x, this.y);
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
        ctx.fill();
    }
}