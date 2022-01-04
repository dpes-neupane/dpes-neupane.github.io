class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.dir = Math.atan(0);


    }
    createRays() {
        this.rays = [];
        for (let i = 0; i < 45; i += 20) {
            this.rays.push(new Ray(this.x, this.y, (this.dir * 180 / Math.PI) + i));
        }
        for (let i = 0; i > -45; i -= 20) {
            this.rays.push(new Ray(this.x, this.y, (this.dir * 180 / Math.PI) + i));
        }
        return this.rays;
    }
    draw() {
        context.beginPath();
        context.arc(this.x, this.y, 5, 0, 2 * Math.PI, false);
        context.fill();

        context.beginPath();
        context.moveTo(this.x, this.y);

        context.lineTo(this.x + Math.cos(this.dir) * 20, this.y + Math.sin(this.dir) * 20);
        context.closePath();
        context.strokeStyle = "red";
        context.stroke();
        context.strokeStyle = "black";
        for (let ray in rays) {
            context.beginPath();
            context.moveTo(this.x, this.y);

            context.lineTo(rays[ray].x + (rays[ray].xdir * 10), rays[ray].y + (rays[ray].ydir * 10));

            context.closePath();
            context.stroke();


        }


    }

    movePlayer(moveLeft, moveRight, moveDown, moveUP) {
        if (moveLeft) {
            this.x -= 2;
            this.dir = 180 * Math.PI / 180;

        }
        if (moveRight) {
            this.x += 2;
            this.dir = 0 * Math.PI / 180;


        }
        if (moveDown) {
            this.y += 2;
            this.dir = 90 * Math.PI / 180;


        }
        if (moveUP) {
            this.y -= 2;
            this.dir = 270 * Math.PI / 180;


        }
        this.draw();

    }
}