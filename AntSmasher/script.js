canvas = document.querySelector("canvas");
console.log(canvas)
ctx = canvas.getContext("2d");
canvas.height = 600;
canvas.width = 800;

//load images
const images = {};
images.sprite = new Image();
images.sprite.src = "./Images/walk.png";



const spriteWidth = 202;
const spriteHeight = 248;
let spriteFrameX = 0;
let spriteFrameY = 0;
let spriteX = 0;
let spriteY = 0;


const imagesBack = {};
imagesBack.sprite = new Image();
imagesBack.sprite.src = "./Images/walk-down.png";
let spriteFrameX1 = 2;
let spriteFrameY1 = 0;
let spriteX1 = 0;
let spriteY1 = 0;


//for hitboxes
let BallArray = []
let mouseCircle;
let clicked = false;
let checkCollision = false;





//for drawing sprites outside the object
/**
 * 
 * @param {object} img - the image object 
 * @param {number} sX - the x-coordinate of the image you want to draw 
 * @param {number} sY - the y-coordinate of the image you want to draw 
 * @param {number} sW - the width of the image you want to draw 
 * @param {number} sH - the height of the image you want to draw 
 * @param {number} dX - the destination x-coordinate where you want to place the image
 * @param {number} dY - the destination y-coordinate where you want to place the image
 * @param {number} dW - the width of image when you place in the canvas
 * @param {number} dH - the height of image when you place in the canvas
 * 
 * 
 * 
 */
function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}






/**
 * 
 * @param {number} x1- x-coordinate of a point
 * @param {number} y1- y-coordinate of the same point
 * @param {number } x2- x-coordinate of the next point
 * @param {number} y2- y-coordinate of the next point
 * @returns {number}
 */

function getDistance(x1, y1, x2, y2) {
    return Math.sqrt((Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2)));


}




//detect collision between given objects and others
/**
 * Returns an object with which the given b collided with.
 * @param {object} b- the object with which you want to check collision with
 * @param {list} arr- the list with which you want to check collision with
 * @returns {object}
 */
function detectCollision(b, arr) {
    collidedCirclesArr = [];
    for (let j = 0; j < arr.length; j++) {
        if (b !== arr[j]) {
            if (getDistance(b.x, b.y, arr[j].x, arr[j].y) - (b.radius + arr[j].radius) < 0) {

                collidedCirclesArr.push(arr[j]);
            }

        }
    }
    return collidedCirclesArr;

}









//the idea is to align the objects in the direction of the both vectors. So, this way the collision looks as 1-d collision
/**
 * calculates the finalvelocities of the two particles.
 * @param {object} particle- first particle 
 * @param {object} particle2- second particle
 * @returns null
 */

function resolveCollision(particle, particle2) {


    var circle1 = particle.ballInfo();
    var circle2 = particle2.ballInfo();
    var dx = circle2.x - circle1.x;
    var dy = circle2.y - circle1.y;
    var distance = Math.sqrt(dx * dx + dy * dy);

    // Check if collision exists

    // Calculate collision vector
    var vCollision = {
        x: circle2.x - circle1.x,
        y: circle2.y - circle1.y,
    };

    // Calculate distance of the collision vecotr
    var distance = Math.sqrt(
        (circle2.x - circle1.x) * (circle2.x - circle1.x) +
        (circle2.y - circle1.y) * (circle2.y - circle1.y)
    );

    // Create normalized collisionvector to find direction
    var vCollisionNorm = {
        x: vCollision.x / distance,
        y: vCollision.y / distance,
    };

    // Calculate relative veloxity and speed
    var vRelativeVelocity = {
        x: circle1.vx - circle2.vx,
        y: circle1.vy - circle2.vy,
    };

    // Calculate the speed in which the balls are moving for collision
    var speed =
        vRelativeVelocity.x * vCollisionNorm.x +
        vRelativeVelocity.y * vCollisionNorm.y;

    // Calculate the impulse the balls have on each other
    var impulse = (2 * speed) / (particle.mass + particle2.mass);

    // Return if speed is negative (Objects are moving away from each other)
    if (speed < 0) {
        return;
    }

    // Calculate the effect of collision on particle by multiplying by impulse, mass of particle2 and normalized collision vector
    particle.velocityX -= impulse * particle2.mass * vCollisionNorm.x;
    particle.velocityY -= impulse * particle2.mass * vCollisionNorm.y;


    // Calculate the effect of collision on particle2 by multiplying by impulse, mass of particle and normalized collision vector
    particle2.velocityX += impulse * particle.mass * vCollisionNorm.x;
    particle2.velocityY += impulse * particle.mass * vCollisionNorm.y;





}















/**
 * gets random number between the given two numbers
 * @param {number} min- minimum value (inclusive) 
 * @param {number} max- maximum value (exclusive)
 * @returns {number}
 */

function getRandomNoBetn(min, max) {
    return Math.random() * (max - min) + min;
}














class Ball {


    /**
     * Represents a Ball 
     * @param {number} x- x-coordinate for the object
     * @param {number} y- y-coordinate for the object
     * @param {number} radius- radius of the object
     * @param {number} ballNo -incex number of the object
     */
    constructor(x, y, radius, ballNo) {
        this.x = x;
        this.y = y;
        this.radius = radius;

        this.vel = getRandomNoBetn(0, 2.5);
        this.angle = getRandomNoBetn(0, Math.PI);

        this.velocityX = this.vel * Math.cos(this.angle);
        this.velocityY = this.vel * Math.sin(this.angle);
        this.mass = 2 * this.radius;
        this.randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        this.ballNo = ballNo;


    }


    /**
     * 
     * @param {string} color - a hex color value 
     */

    draw(color) {


        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.strokeStyle = "blue";


        ctx.lineTo((this.x + this.velocityX * 10), (this.y + this.velocityY * 10));


        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        if (!color) {
            ctx.strokeStyle = this.randomColor;

        } else {
            ctx.fillStyle = color;

        }
        ctx.stroke();

    }




    /**
     * this updates the ball object --mostly moving
     */

    update() {


        if (((this.x + this.velocityX + this.radius) >= canvas.width) || ((this.x + this.velocityX - this.radius) < 0)) this.velocityX = -this.velocityX;
        if (((this.y + this.velocityY + this.radius) >= canvas.height) || ((this.y + this.velocityY - this.radius) < 0)) this.velocityY = -this.velocityY;

        this.x += this.velocityX;
        this.y += this.velocityY;


    }




    /**
     * 
     *this will draw an sprite image in the given place
     * 
     * @param { object} img - the image object 
     * @param {number} sX - the x-coordinate of the image you want to draw 
     * @param {number} sY - the y-coordinate of the image you want to draw 
     * @param {number} sW - the width of the image you want to draw 
     * @param {number} sH - the height of the image you want to draw 

     * @param {number} dX - the destination x-coordinate where you want to place the image
     * @param {number} dY - the destination y-coordinate where you want to place the image
     * @param {number} dW - the width of image when you place in the canvas
     * @param {number} dH - the height of image when you place in the canvas
     * 
     * 
     * 
     
     */
    drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {

        ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);

    }



    // gives out the information of the ball
    ballInfo() {
        return {
            radius: this.radius,
            x: this.x,
            y: this.y,
            vx: this.velocityX,
            vy: this.velocityY,
        };
    }






}




/**
 * Returns an array of objects with the given number of balls.
 * @param {number} noOfBalls -the no of balls that you want to create
 * @returns {list}
 */
function CreateBallsArr(noOfBalls) {
    //if noOfBalls is <100 use radii 10 to 50.
    //if noOfBalls is <500 use radii 5 to 18
    //if noOfBalls is <1000 use radii 5 to 8

    var placed = 0;
    maxAttempts = 3000;
    arr = []
    while (placed < noOfBalls && maxAttempts > 0) {

        let radii = 20;
        let x = getRandomNoBetn(radii, canvas.width - radii);
        let y = getRandomNoBetn(radii, canvas.height - radii);
        available = true;
        if (arr.length > 0)
            for (let i = 0; i < arr.length; i++) {
                if (getDistance(x, y, arr[i].x, arr[i].y) - (radii + arr[i].radius) < 0) {
                    available = false;
                    indexNo = i;
                    break;
                }
            }

        if (available) {
            arr.push(new Ball(x, y, radii, placed));
            placed += 1;
        }
        maxAttempts--;


    }



    //if someone wants to find out why there are not enough objects as there should be.
    // if (maxAttempts === 0) {
    //     console.log("only placed " + placed + "objects");
    // }
    return arr;

}






//initializing the animation objects
function init() {
    BallArray = CreateBallsArr(20);


}









function animate() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);


    spriteFrameX += 1;
    spriteFrameX %= 6;
    spriteFrameY += 1;

    spriteFrameY %= 6;


    spriteFrameX1 += 1;
    spriteFrameY1 += 1;
    if (spriteFrameX1 > 8 && spriteFrameY1 === 0) {
        spriteFrameX1 = 2;
    } else {
        spriteFrameX1 %= 8;
        spriteFrameY1 %= 8;
    }


    let boundary = new Rectangle(canvas.width / 2, canvas.height / 2, canvas.width / 2, canvas.height / 2);
    let qt = new QuadTree(boundary, 5);



    for (let i = 0; i < BallArray.length; i++) {
        qt.insert(BallArray[i]);
        ctx.save();
        ctx.translate(BallArray[i].x, BallArray[i].y);

        let angle = Math.atan(BallArray[i].velocityY / BallArray[i].velocityX);

        ctx.rotate(angle + Math.PI / 2);
        if (BallArray[i].velocityX < 0) {
            drawSprite(imagesBack.sprite, spriteFrameX1 * spriteWidth, spriteFrameY1 * spriteHeight, spriteWidth, spriteHeight, 0 - 20, 0 - 20, 40, 40)
        } else {
            drawSprite(images.sprite, spriteFrameX * spriteWidth, spriteFrameY * spriteHeight, spriteWidth, spriteHeight, 0 - 20, 0 - 20, 40, 40);

        }
        ctx.restore();
    }



    if (checkCollision) {

        let closerWithMouse = qt.query(new QueryCircle(mouseCircle.x, mouseCircle.y, mouseCircle.radius * 20));
        let collidedCirclesWMouse = detectCollision(mouseCircle, closerWithMouse);

        console.log(collidedCirclesWMouse[0]);

        BallArray = BallArray.filter((element, index) => {

            return collidedCirclesWMouse[0] !== element;
        });


        checkCollision = false;
    }




    for (let i = 0; i < BallArray.length; i++) {
        let range = new QueryCircle(BallArray[i].x, BallArray[i].y, BallArray[i].radius * 2);
        closeCircles = qt.query(range);
        collidedCircles = detectCollision(BallArray[i], closeCircles);

        for (let j = 0; j < collidedCircles.length; j++) {
            resolveCollision(collidedCircles[j], BallArray[i]);

        }

        BallArray[i].update();

    }





    requestAnimationFrame(animate);


}



window.addEventListener("mousemove", (e) => {
    let rect = canvas.getBoundingClientRect();
    mouseCircle = new Ball(e.x - rect.x, e.y - rect.y, 2);


    clicked = true;



})
window.addEventListener("click", () => {
    checkCollision = true;
})



//running animation loop

init();

animate();