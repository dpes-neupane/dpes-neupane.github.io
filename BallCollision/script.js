canvas = document.querySelector("canvas");
console.log(canvas)
ctx = canvas.getContext("2d");
canvas.height = 500;
canvas.width = 900;



function getDistance(x1, y1, x2, y2) {
    return Math.sqrt((Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2)));


}

function detectCollision(b, arr) {
    for (let j = 0; j < arr.length; j++) {
        if (b !== arr[j]) {
            if (getDistance(b.x, b.y, arr[j].x, arr[j].y) - (b.radius + arr[j].radius) < 0) {

                return true;
            }

        }
    }
    return false;

}


function getRandomNoBetn(min, max) {
    return Math.random() * (max - min) + min;
}


function CreateBallsArr(noOfBalls) {
    //if noOfBalls is <100 use radii 10 to 50.
    //if noOfBalls is <500 use radii 5 to 18
    //if noOfBalls is <1000 use radii 5 to 8

    var placed = 0;
    maxAttempts = 3000;
    arr = []
    while (placed < noOfBalls && maxAttempts > 0) {
        let radii = getRandomNoBetn(5, 8);
        let x = getRandomNoBetn(radii, canvas.width - radii);
        let y = getRandomNoBetn(radii, canvas.height - radii);
        available = true;
        if (arr.length > 0)
            for (let i = 0; i < arr.length; i++) {
                if (getDistance(x, y, arr[i].x, arr[i].y) - (radii + arr[i].radius) < 0) {
                    available = false;
                    break;
                }
            }

        if (available) {
            arr.push(new Ball(x, y, radii));
            placed += 1;
        }
        maxAttempts--;






    }
    if (maxAttempts === 0) {
        console.log("only placed " + placed + "objects");
    }
    return arr;

}









class Ball {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.velocityX = getRandomNoBetn(-0.5, 0.5);
        this.velocityY = getRandomNoBetn(-0.5, 0.5);

    }


    draw() {



        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

    }

    update() {
        this.draw();
        if (((this.x + this.velocityX + this.radius) >= canvas.width) || ((this.x + this.velocityX - this.radius) < 0)) this.velocityX = -this.velocityX;
        if (((this.y + this.velocityY + this.radius) >= canvas.height) || ((this.y + this.velocityY - this.radius) < 0)) this.velocityY = -this.velocityY;

        this.x += this.velocityX;
        this.y += this.velocityY;

    }




}





BallArray = CreateBallsArr(1000);
// console.log(BallArray);





function animate() {




    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < BallArray.length; i++) {
        ctx.beginPath();
        BallArray[i].update();
        ctx.stroke();
    }


    requestAnimationFrame(animate);

}

animate();