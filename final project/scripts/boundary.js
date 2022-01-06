class Boundary {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    draw(color) {
        if (color) {
            context.fillStyle = color;
        } else {
            context.fillStyle = "grey";

        }
        context.fillRect(this.x, this.y, this.w, this.h);

    }
    intersects(boundary) {
        return (this.x < boundary.x + boundary.w + 1 &&
            this.x + this.w + 1 > boundary.x &&
            this.y < boundary.y + boundary.h + 1 &&
            this.h + this.y + 1 > boundary.y);
    }
}