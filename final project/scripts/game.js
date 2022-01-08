/**
 * Calculates the distance between two points
 * 
 * @param {number} x1- x-coordinate of a point
 * @param {number} y1- y-coordinate of the same point
 * @param {number } x2- x-coordinate of the next point
 * @param {number} y2- y-coordinate of the next point
 * @returns number
 */

function getDistance(x1, y1, x2, y2) {
    return Math.sqrt((Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2)));


}


// function knockoutAndRefill(x0, y0, x1, y1, x2, y2) {
//     context.save();
//     context.fillStyle = 'black';
//     context.fillRect(0, 0, canvas.width, canvas.height);
//     context.beginPath();
//     context.moveTo(x0, y0);
//     context.lineTo(x1, y1);
//     context.lineTo(x2, y2);
//     context.closePath();
//     context.clip();
//     context.drawImage(img, 0, 0);
//     context.restore();
// }

function knockoutAndRefill(x0, y0, rays) {
    context.save();


    context.beginPath();
    context.moveTo(x0, y0);
    rays.forEach(element => {
        context.lineTo(element.endpointX, element.endpointY);

    })

    context.closePath();
    context.clip();
    context.drawImage(img, 0, 0);
    context.restore();
}




class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.dir = Math.atan(0);
        this.spriteImage = new Image();
        this.spriteImage.src = "./images/wizard.png";
        this.width = 20;
        this.height = 40;
        this.boundary = new Boundary(this.x - 10, this.y - 10, this.width, this.height);
        this.speed = 5;
        this.tilePositionX = 1;
        this.tilePositionY = 1;

    }
    createRays() {
        this.rays = [];
        for (let i = 30; i > 0; i -= 3) {
            this.rays.push(new Ray(this.x, this.y, (this.dir * 180 / Math.PI) + i));
        }
        for (let i = 0; i >= -30; i -= 3) {
            this.rays.push(new Ray(this.x, this.y, (this.dir * 180 / Math.PI) + i));
        }


        return this.rays;
    }
    draw(tiles) {
        // context.beginPath();
        // context.arc(this.x, this.y, 5, 0, 2 * Math.PI, false);
        context.fillStyle = "white";
        // context.fill();

        context.beginPath();
        context.moveTo(this.x, this.y);

        context.lineTo(this.x + Math.cos(this.dir) * 40, this.y + Math.sin(this.dir) * 40);
        context.closePath();
        context.strokeStyle = "red";
        context.stroke();
        context.strokeStyle = "black";
        this.createRays();
        this.boundary.x = this.x - 10;
        this.boundary.y = this.y - 10;
        this.checkCollision(tiles);

        this.drawRays();
        this.boundary.draw();

        this.drawSprite();
        context.fillStyle = "black";


    }

    movePlayer(moveLeft, moveRight, moveDown, moveUP, tiles) {


        if (moveLeft) {

            this.x -= this.speed;
            this.dir = 180 * Math.PI / 180;
            if (this.x % 100 === 0) {
                this.tilePositionX--;
            }


        }
        if (moveRight) {
            this.x += this.speed;
            this.dir = 0;
            if (this.x % 100 === 0) {
                this.tilePositionX++;
            }


        }
        if (moveDown) {
            this.y += this.speed;
            this.dir = 90 * Math.PI / 180;
            if (this.y % 100 === 0) {
                this.tilePositionY++;
            }

        }
        if (moveUP) {
            this.y -= this.speed;
            this.dir = 270 * Math.PI / 180;

            if (this.y % 100 === 0) {
                this.tilePositionY--;
            }
        }



    }

    checkCollision(tiles) {
        let points = [];

        this.rays.forEach(element => {
            let point = element.collides(tiles);
            if (point !== undefined) {
                points.push(point);

                element.endpointX = point.x;
                element.endpointY = point.y;






            }

        });



    }


    drawRays() {
        // context.beginPath();

        // context.strokeStyle = "white";

        // context.moveTo(this.x, this.y);

        // context.moveTo(this.x, this.y);
        // context.lineTo(this.rays[0].endpointX, this.rays[0].endpointY);

        // context.stroke();






        // for (let i = 1; i < this.rays.length - 1; i++) {


        //     context.moveTo(this.x, this.y);
        //     context.lineTo(this.rays[i].endpointX, this.rays[i].endpointY);


        // }
        // context.lineTo(this.rays[this.rays.length - 1].endpointX, this.rays[this.rays.length - 1].endpointY);
        // context.closePath();
        // // context.fill();
        // context.stroke();

        // for (let i = 1; i < this.rays.length; i++) {
        //     knockoutAndRefill(this.x, this.y, this.rays[i - 1].endpointX, this.rays[i - 1].endpointY, this.rays[i].endpointX, this.rays[i].endpointY);
        // }
        // knockoutAndRefill(this.x, this.y, this.rays[0].endpointX, this.rays[0].endpointY, this.rays[this.rays.length - 3].endpointX, this.rays[this.rays.length - 3].endpointY);
        knockoutAndRefill(this.x, this.y, this.rays);




    }

    drawSprite() {
        context.drawImage(this.spriteImage, 0, 0, 56.25, 96, this.x - 10, this.y - 10, this.width, this.height);
    }

    collisionWithWalls(tiles) {
        let collides = false;

        tiles.forEach(element => {

            if (this.boundary.intersects(element.boundary)) {

                collides = true;
            }
        });
        return collides;
    }


}



class Demon {
    constructor(x, y, w, h, spriteNo) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.boundary = new Boundary(this.x, this.y, this.w, this.h);
        this.image = new Image();
        this.image.src = "./images/demon.png";
        this.spriteNo = spriteNo;

    }




    drawSprite() {
        let i = 0,
            j = 10;
        if (this.spriteNo === 2) {
            j = 64;
        } else if (this.spriteNo === 3) {
            j = 128;
        } else if (this.spriteNo === 4) {
            j = 192;
        }
        context.drawImage(this.image, i, j, 64, 64, this.x, this.y, this.w, this.h);
    }



}



class Light {
    constructor(x, y) {
        this.x = x;
        this.y = y;

    }
    shine() {

    }
    createRays() {
        this.rays = [];
        for (let i = 0; i < 360; i += 10) {
            this.rays.push(new Ray(this.x, this.y, (this.dir * 180 / Math.PI) + i));
        }



        return this.rays;
    }
}