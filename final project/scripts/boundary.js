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
        return (this.x < boundary.x + boundary.w &&
            this.x + this.w > boundary.x &&
            this.y < boundary.y + boundary.h &&
            this.h + this.y > boundary.y);
    }
}