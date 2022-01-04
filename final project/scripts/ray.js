class Ray {
    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.xdir = Math.cos(angle * (Math.PI / 180));
        this.ydir = Math.sin(angle * (Math.PI / 180));

    }
    collides(boundary) {

    }
}