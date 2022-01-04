class Boundary {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    draw() {
        context.fillRect(this.x, this.y, this.w, this.h);
        context.fillStyle = "red";
    }
}