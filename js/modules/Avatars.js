import GameObject from './GameObject.js';

class FallingEntity extends GameObject {
    constructor(x, y, speed, code, symbol) {
        super(x, y, speed);
        this.code = code;
        this.symbol = symbol;
    }

    update(canvasHeight) {
        this.y += this.speed;
        return this.y > canvasHeight; // Gibt true zurück, wenn Boden erreicht
    }

    draw(ctx) {
        ctx.font = "40px serif";
        ctx.textAlign = "center";
        ctx.fillText(this.symbol, this.x, this.y);
        ctx.font = "14px monospace";
        ctx.fillStyle = "#ffd700";
        ctx.fillText(`[${this.code}]`, this.x, this.y + 20);
    }
}

export class Swan extends FallingEntity {
    constructor(x, speed, code) { super(x, 0, speed, code, "🦢"); }
}

export class Bull extends FallingEntity {
    constructor(x, speed, code) { super(x, 0, speed, code, "🐂"); }
}