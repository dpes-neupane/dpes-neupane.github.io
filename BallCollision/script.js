canvas = document.querySelector("canvas");
console.log(canvas)
ctx = canvas.getContext("2d");
canvas.height = 500;
canvas.width = 700;



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








class Rectangle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    contains(obj) {
        return (obj.x >= (this.x - this.w) &&
            obj.x <= (this.x + this.w) &&
            obj.y >= (this.y - this.h) &&
            obj.y <= (this.y + this.h));
    }



    intersects(range) {
        return !(range.x - range.w > this.x + this.w ||
            range.x + range.w < this.x - this.w ||
            range.y - range.h > this.y + this.h ||
            range.y + range.h < this.y - this.h);


    }
    draw() {
        ctx.rect(this.x - this.w, this.y - this.h, this.w * 2, this.h * 2);

        ctx.stroke();
    }
}


class QuadTree {
    constructor(boundary, capacity) {
        this.boundary = boundary;
        this.capacity = capacity;
        this.objs = [];
        this.divided = false;
    }






    subdivide() {

        let x = this.boundary.x;
        let y = this.boundary.y;
        let w = this.boundary.w;
        let h = this.boundary.h;



        let nw = new Rectangle(x - w / 2, y - h / 2, w / 2, h / 2);

        this.northwest = new QuadTree(nw, this.capacity);

        let ne = new Rectangle(x + w / 2, y - h / 2, w / 2, h / 2);
        this.northeast = new QuadTree(ne, this.capacity);


        let sw = new Rectangle(x - w / 2, y + h / 2, w / 2, h / 2);
        this.southwest = new QuadTree(sw, this.capacity);


        let se = new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2);
        this.southeast = new QuadTree(se, this.capacity);
        this.divided = true;

    }



    insert(obj) {
        if (!this.boundary.contains(obj)) {
            // console.log("does not contain", obj, this.boundary);
            return false;
        }

        if (this.objs.length < this.capacity) {
            // console.log("pushed", obj);
            this.objs.push(obj);
            return true;
        }
        if (!this.divided) {
            this.subdivide();

        }
        return (this.northeast.insert(obj) ||
            this.northwest.insert(obj) ||
            this.southeast.insert(obj) ||
            this.southwest.insert(obj));




    }



    query(range, found) {
        if (!found) {
            found = [];
        }

        if (!range.intersects(this.boundary)) {;
            return found;
        }
        for (let p of this.objs) {

            if (range.contains(p)) {

                found.push(p);
            }
        }

        if (this.divided) {
            this.northwest.query(range, found);
            this.northeast.query(range, found);
            this.southwest.query(range, found);
            this.southeast.query(range, found);

        }


        return found;

    }

    show() {

        ctx.rect(this.boundary.x - this.boundary.w, this.boundary.y - this.boundary.h, this.boundary.w * 2, this.boundary.h * 2);
        ctx.stroke();
        this.objs.forEach(element => {
            ctx.beginPath();
            element.draw();
            ctx.closePath();

            ctx.fill();
        })

        if (this.divided) {
            this.northeast.show();
            this.northwest.show();
            this.southeast.show();
            this.southwest.show();

        }

    }



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
        let radii = getRandomNoBetn(5, 16);
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



class QueryCircle {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }


    //if the query circle has the given circle object inside it returns true. compares the euclidean distance between them.
    contains(obj) {
        if (getDistance(obj.x, obj.y, this.x, this.y) - (this.radius + obj.radius) < 0) { //radii are subtracted to compensate the bigger area of the circle.
            return true;
        }
    }
    intersects(range) {
        let xD = Math.abs(range.x - this.x);
        let yD = Math.abs(range.y - this.y);

        let edges = Math.pow((xD - range.w), 2) + Math.pow((yD - range.h), 2);


        //no intersection
        if (xD > (this.radius + range.w) || yD > (this.radius + range.h)) return false;


        //intersection within the Circle
        if (xD <= range.w || yD <= range.h) {
            return true;
        }

        return edges <= this.rSquared;


    }




}








class Ball {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.velocityX = getRandomNoBetn(-0.7, 1);
        this.velocityY = getRandomNoBetn(-0.7, 1);
        this.mass = 2 * this.radius;
        this.randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);


    }


    draw(color) {



        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        if (!color)
            ctx.fillStyle = this.randomColor;
        else ctx.fillStyle = color;

    }

    update() {
        ctx.beginPath();

        this.draw();
        ctx.fill();

        if (((this.x + this.velocityX + this.radius) >= canvas.width) || ((this.x + this.velocityX - this.radius) < 0)) this.velocityX = -this.velocityX;
        if (((this.y + this.velocityY + this.radius) >= canvas.height) || ((this.y + this.velocityY - this.radius) < 0)) this.velocityY = -this.velocityY;

        this.x += this.velocityX;
        this.y += this.velocityY;

    }





}

let BallArray = []

function init() {
    BallArray = CreateBallsArr(100);






    // ctx.stroke();

}







function animate() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let boundary = new Rectangle(canvas.width / 2, canvas.height / 2, canvas.width / 2, canvas.height / 2);
    let qt = new QuadTree(boundary, 5);
    for (let i = 0; i < BallArray.length; i++) {
        qt.insert(BallArray[i]);
        // BallArray[i].draw();
    }
    // qt.show();




    // console.log(points);
    // points.forEach(element => {
    //     ctx.beginPath();
    //     element.draw("green");

    //     ctx.fill()
    // })

    for (let i = 0; i < BallArray.length; i++) {
        let range = new QueryCircle(BallArray[i].x, BallArray[i].y, BallArray[i].radius * 2);
        closeCircles = qt.query(range);
        collidedCircles = detectCollision(BallArray[i], closeCircles);
        // console.log(collidedCircles);
        for (let j = 0; j < collidedCircles.length; j++) {
            resolveCollision(collidedCircles[j], BallArray[i]);
            // console.log(collidedCircles[j], BallArray[i]);
        }
        BallArray[i].update();
        // if (detectCollision(BallArray[i], BallArray)) console.log(BallArray[i]);
    }
    // console.log(canvas.getBoundingClientRect());

    requestAnimationFrame(animate);


}

init();

animate();