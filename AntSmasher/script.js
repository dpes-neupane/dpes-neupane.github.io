canvas = document.querySelector("canvas");
console.log(canvas)
ctx = canvas.getContext("2d");
canvas.height = 600;
canvas.width = 800;

//load images
const images = {};
images.sprite = new Image();
images.sprite.src = "./images/walk.png";

const spriteWidth = 202;
const spriteHeight = 248;
let spriteFrameX = 0;
let spriteFrameY = 0;
let spriteX = 0;
let spriteY = 0;



function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}







function getDistance(x1, y1, x2, y2) {
    return Math.sqrt((Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2)));


}

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


function rotate(velocityX, velocityY, angle) {
    const rotatedVelocities = {
        x: velocityX * Math.cos(angle) - velocityY * Math.sin(angle),
        y: velocityX * Math.sin(angle) + velocityY * Math.cos(angle)
    };

    return rotatedVelocities;
}





function resolveCollision(particle, otherParticle) {
    const xVelocityDiff = particle.velocityX - otherParticle.velocityX;
    const yVelocityDiff = particle.velocityY - otherParticle.velocityY;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Grab angle between the two colliding particles
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        // Store mass in var for better readability in collision equation
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        // Velocity before equation
        const u1 = rotate(particle.velocityX, particle.velocityY, angle);
        const u2 = rotate(otherParticle.velocityX, otherParticle.velocityY, angle);

        // Velocity after 1d collision equation
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1.x, v1.y, -angle);
        const vFinal2 = rotate(v2.x, v2.y, -angle);

        // Swap particle velocities for realistic bounce effect
        particle.velocityX = vFinal1.x;
        particle.velocityY = vFinal1.y;

        otherParticle.velocityX = vFinal2.x;
        otherParticle.velocityX = vFinal2.y;
    }
}

















function getRandomNoBetn(min, max) {
    return Math.random() * (max - min) + min;
}














class Ball {
    constructor(x, y, radius, ballNo) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.velocityX = getRandomNoBetn(0, 2.5);
        this.velocityY = getRandomNoBetn(0, 2.5);
        this.mass = 2 * this.radius;
        this.randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        this.ballNo = ballNo;


    }


    draw(color) {


        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.strokeStyle = "green";










        ctx.lineTo((this.x + this.velocityX * 10), (this.y + this.velocityY * 10));
        // ctx.setTransform(1, 0, 0, 1, 0, 0);

        ctx.stroke();
        ctx.closePath();
        // ctx.beginPath();
        // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        // if (!color) {
        //     // ctx.fillStyle = this.randomColor;
        //     ctx.strokeStyle = this.randomColor;

        // } else {
        //     ctx.fillStyle = color;

        // }
        // ctx.stroke();

    }

    update() {

        this.angle = Math.atan(this.x + this.velocityX, this.y + this.velocityY);

        this.draw("");


        if (((this.x + this.velocityX + this.radius) >= canvas.width) || ((this.x + this.velocityX - this.radius) < 0)) this.velocityX = -this.velocityX;
        if (((this.y + this.velocityY + this.radius) >= canvas.height) || ((this.y + this.velocityY - this.radius) < 0)) this.velocityY = -this.velocityY;

        this.x += this.velocityX;
        this.y += this.velocityY;

    }
    drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
        ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
    }






}

let BallArray = []
let mouseCircle;
let clicked = false;
let checkCollision = false;



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
    if (maxAttempts === 0) {
        console.log("only placed " + placed + "objects");
    }
    return arr;

}

function init() {
    BallArray = CreateBallsArr(20);







}







function animate() {


    ctx.clearRect(0, 0, canvas.width, canvas.height);


    spriteFrameX += 1;
    spriteFrameX %= 6;
    spriteFrameY += 1;

    spriteFrameY %= 6;

    let boundary = new Rectangle(canvas.width / 2, canvas.height / 2, canvas.width / 2, canvas.height / 2);
    let qt = new QuadTree(boundary, 5);
    for (let i = 0; i < BallArray.length; i++) {
        qt.insert(BallArray[i]);
        BallArray[i].drawSprite(images.sprite, spriteFrameX * spriteWidth, spriteFrameY * spriteHeight, spriteWidth, spriteHeight, BallArray[i].x - 20, BallArray[i].y - 20, 40, 40);

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


init();

animate();