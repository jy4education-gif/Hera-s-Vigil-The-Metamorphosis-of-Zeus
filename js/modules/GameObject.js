export default class GameObject {
    #x; // Private Kapselung
    #y;

    constructor(x, y, speed) {
        if (this.constructor === GameObject) {
            throw new Error("Abstract Class 'GameObject' cannot be instantiated.");
        }
        this.#x = x;
        this.#y = y;
        this.speed = speed;
        this.active = true;
    }

    get x() { return this.#x; }
    get y() { return this.#y; }
    set x(val) { this.#x = val; }
    set y(val) { this.#y = val; }

    update() { throw new Error("Method 'update()' must be implemented."); }
    draw(ctx) { throw new Error("Method 'draw()' must be implemented."); }
}