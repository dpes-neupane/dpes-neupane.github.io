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
        this.image = new Image();
        this.image.src = "./images/only-walls-y.png";

    }
    createRays() {
        this.rays = [];
        for (let i = 30; i > 0; i -= 3) {
            this.rays.push(new Ray(this.x, this.y, (this.dir * 180 / Math.PI) + i, 150));
        }
        for (let i = 0; i >= -30; i -= 3) {
            this.rays.push(new Ray(this.x, this.y, (this.dir * 180 / Math.PI) + i, 150));
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
        // this.boundary.draw();

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


        this.rays.forEach(element => {
            let point = element.collides(tiles);
            if (point !== undefined) {


                element.endpointX = point.x;
                element.endpointY = point.y;






            }

        });



    }


    drawRays() {
        // context.beginPath();

        // context.strokeStyle = "white";

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
        this.knockoutAndRefill(this.x, this.y, this.rays);




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
    knockoutAndRefill() {
        context.save();


        context.beginPath();
        context.moveTo(this.x, this.y);
        this.rays.forEach(element => {
            context.lineTo(element.endpointX, element.endpointY);

        })

        context.closePath();
        context.clip();
        context.drawImage(this.image, 0, 0);
        context.restore();
    }


}



class Demon {
    constructor(x, y, w, h, spriteNo) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        if (spriteNo === 2) {
            this.boundary = new Boundary(this.x + 20, this.y, this.w - 20, this.h - 5);
        } else if (spriteNo === 4) {
            this.boundary = new Boundary(this.x, this.y, 32, this.h);
        } else {
            this.boundary = new Boundary(this.x, this.y + 5, this.w, this.h - 10);
        }

        this.image = new Image();
        this.image.src = "./images/demon.png";
        this.spriteNo = spriteNo;
        this.projectile = [];
    }




    drawSprite() {
        let i = 0,
            width = 64,
            height = 64,
            j = 10;
        let dw = this.w,
            dh = this.h;
        if (this.spriteNo === 2) {
            j = 64;




        } else if (this.spriteNo === 3) {
            j = 128;
        } else if (this.spriteNo === 4) {
            j = 192;
            width = 32;
            dw = 32;

        }
        // this.boundary.draw();
        context.drawImage(this.image, i, j, width, height, this.x, this.y, dw, dh);
    }

    periodicFireBall(timeings) {
        setInterval(this.generateFireBall.bind(this), timeings);
    }



    generateFireBall() {
        // console.log("one");

        let projectile = new Projectile(this.x + 20, this.y + 10, this.spriteNo);
        this.projectile.push(projectile);

    }

    shootFireBall(player) {
        let collided = false;
        this.projectile.forEach(element => {

            element.move();
            let c = element.checkCollision(player);

            if (c) {
                collided = c;
            }


        });
        this.projectile = this.projectile.filter(element => {
            return (!(element.x < 0 || element.y < 0 || element.x > canvas.width || element.y > canvas.height))
        });
        collided = this.checkCollision(player);
        return collided;
    }

    checkCollision(player) {
        return this.boundary.intersects(player.boundary);
    }

}



class Light {
    constructor(x, y, noOfTilesAtOneAxis) {
        this.x = x;
        this.y = y;
        this.rays = [];
        this.tilePositionX = Math.floor(this.x / noOfTilesAtOneAxis);
        this.tilePositionY = Math.floor(this.y / noOfTilesAtOneAxis);
        this.image = new Image();
        this.image.src = "./images/only-walls-1.png";
        this.spriteImage = new Image();
        this.spriteImage.src = "./images/LightEffect.png";
    }
    shine(tiles) {

        this.createRays();
        context.fillStyle = "white";
        this.rays.forEach(element => {
            let point = element.collides(tiles);
            if (point !== undefined) {


                element.endpointX = point.x;
                element.endpointY = point.y;


            }

        });
        this.knockoutAndRefill(this.x, this.y, this.rays);


    }
    createRays() {
        this.rays = [];
        for (let i = 0; i <= 360; i += 10) {
            this.rays.push(new Ray(this.x, this.y, i, 90));
        }



        return this.rays;
    }
    drawSprite() {
        context.drawImage(this.spriteImage, 0, 0, 150, 150, this.x - 22, this.y - 28, 50, 50);
    }





    knockoutAndRefill() {
        context.save();


        context.beginPath();
        context.moveTo(this.x, this.y);
        this.rays.forEach(element => {
            context.lineTo(element.endpointX, element.endpointY);

        })

        context.closePath();

        context.clip();
        context.drawImage(this.image, 0, 0);
        context.restore();
    }





}


class Projectile {
    constructor(x, y, direction) {
        this.x = x;
        this.y = y;
        this.boundary = new Boundary(this.x, this.y, 10, 10);
        this.spriteImage = new Image();
        this.spriteImage.src = "./images/Fireball2.png";
        this.speed = 1;
        this.direction = direction;
    }
    drawSprite() {
        // this.boundary.draw();
        context.drawImage(this.spriteImage, 0, 0, 16, 16, this.x - 5, this.y - 4, 16, 16);

    }
    move() {
        if (this.direction === 2) {
            this.x -= this.speed;
        } else if (this.direction === 3) {
            this.y += this.speed;
        } else if (this.direction === 4) {
            this.x += this.speed;
        } else {
            this.y -= this.speed;
        }
        this.boundary = new Boundary(this.x, this.y, 10, 10);
        this.drawSprite();

    }
    checkCollision(player) {

        return this.boundary.intersects(player.boundary);
    }
}