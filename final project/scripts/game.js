class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.dir = Math.atan(0);


    }
    createRays() {
        this.rays = [];
        for (let i = 0; i < 15; i += 15) {
            this.rays.push(new Ray(this.x, this.y, (this.dir * 180 / Math.PI) + i));
        }
        // for (let i = -30; i > -45; i -= 15) {
        //     this.rays.push(new Ray(this.x, this.y, (this.dir * 180 / Math.PI) + i));
        // }
        return this.rays;
    }
    draw() {
        context.beginPath();
        context.arc(this.x, this.y, 5, 0, 2 * Math.PI, false);
        context.strokeStyle = "green";
        context.stroke();

        context.beginPath();
        context.moveTo(this.x, this.y);

        context.lineTo(this.x + Math.cos(this.dir) * 40, this.y + Math.sin(this.dir) * 40);
        context.closePath();
        context.strokeStyle = "red";
        context.stroke();
        context.strokeStyle = "black";
        context.beginPath();
        context.moveTo(this.x, this.y);

        for (let ray in rays) {


            context.moveTo(this.x, this.y);

            context.lineTo(rays[ray].x + (rays[ray].xdir * 100), rays[ray].y + (rays[ray].ydir * 100));
            if (ray != 0)
                context.lineTo(rays[ray - 1].x + (rays[ray - 1].xdir * 100), rays[ray - 1].y + (rays[ray - 1].ydir * 100));

            context.closePath();

            // context.stroke();


        }

        context.stroke();


    }

    movePlayer(moveLeft, moveRight, moveDown, moveUP) {
        if (moveLeft) {
            this.x -= 2;
            this.dir = 180 * Math.PI / 180;

        }
        if (moveRight) {
            this.x += 2;
            this.dir = 0;


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
    changeDirection(mousemove) {
        this.dir = Math.atan(mousemove[1] / mousemove[0]);
        // if (mousemove[1] < this.y) {
        //     this.dir = 2 * Math.PI - this.dir;
        // }
        // if (mousemove[0] < this.x) {
        //     this.dir = 2 * Math.PI - this.dir;
        // }

    }
    checkCollision(boundaries) {
        let points = [];
        this.rays.forEach(element => {
            points.push(element.collides(boundaries));
        });

    }
}