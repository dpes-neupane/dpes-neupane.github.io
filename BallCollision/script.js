canvas = document.querySelector("canvas");
console.log(canvas)
ctx = canvas.getContext("2d");
canvas.height = 500;
canvas.width = 700;
let BallArray = []



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








class Rectangle {

    /**
     * constructor of the rectangle object  
     * @param {number} x - the x-coordinate of the object
     * @param {number} y -the y-coordinate of the object
     * @param {number} w -the width of th object
     * @param {number } h -the height of the object
     */
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }



    /**
     * checks if the current object contains the object passed in the method.  
     * @param {object} obj the object which needs to be checked 
     * @returns {boolean}
     */
    contains(obj) {
        return (obj.x >= (this.x - this.w) &&
            obj.x <= (this.x + this.w) &&
            obj.y >= (this.y - this.h) &&
            obj.y <= (this.y + this.h));
    }

    /**
     * checks if the passed object intersects with the given object
     * @param {object} range -an object with which the intersection needs to be checked 
     * @returns {boolean}
     */

    intersects(range) {
        return !(range.x - range.w > this.x + this.w ||
            range.x + range.w < this.x - this.w ||
            range.y - range.h > this.y + this.h ||
            range.y + range.h < this.y - this.h);


    }



    /**
     * draws the rectangle 
     */
    draw() {
        ctx.rect(this.x - this.w, this.y - this.h, this.w * 2, this.h * 2);

        ctx.stroke();
    }
}


class QuadTree {

    /**
     * constructor for the quad tree    
     * @param {object} boundary -rectangle type object 
     * @param {number} capacity -number of objects it can hold
     */
    constructor(boundary, capacity) {
        this.boundary = boundary;
        this.capacity = capacity;
        this.objs = [];
        this.divided = false;
    }





    /**
     * this function tries to subdivide the given region into four halves
     * hence the name quadtree
     */
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

    /**
     * this method tries to insert an object in the given region
     * if the capacity is full for that region, then it subdivides.
     * @param {object} obj -the object that needs to be potentially inserted
     * @returns {boolean}
     */

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





    /**
     * querying for the nearby objects that are stored in the quadtree
     * @param {object} range -rectangle or circle oject 
     * @param {list} found -array to which the found objects are returned with
     * @returns {list}
     */
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
        /**
         * for visualizing the regions
         */
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







/**
 * gets random number between the given two numbers
 * @param {number} min- minimum value (inclusive) 
 * @param {number} max- maximum value (exclusive)
 * @returns {number}
 */
function getRandomNoBetn(min, max) {
    return Math.random() * (max - min) + min;
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


    /**
     * checks if the given object is intersecting with this object.
     * @param {object} range - a region that needs to be checked if it is interecting with this circle or not.
     * @returns {boolean}
     */
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
    /**
     * Represents a Ball 
     * @param {number} x- x-coordinate for the object
     * @param {number} y- y-coordinate for the object
     * @param {number} radius- radius of the object
     * 
     */
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.velocityX = getRandomNoBetn(-0.7, 1);
        this.velocityY = getRandomNoBetn(-0.7, 1);
        this.mass = 2 * this.radius;
        this.randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);


    }


    /**
     * 
     * @param {string} color - a hex color value 
     */


    draw(color) {



        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        if (!color)
            ctx.fillStyle = this.randomColor;
        else ctx.fillStyle = color;

    }


    /**
     * this updates the ball object --mostly moving and redrawing.
     */

    update() {
        ctx.beginPath();

        this.draw();
        ctx.fill();

        if (((this.x + this.velocityX + this.radius) >= canvas.width) || ((this.x + this.velocityX - this.radius) < 0)) this.velocityX = -this.velocityX;
        if (((this.y + this.velocityY + this.radius) >= canvas.height) || ((this.y + this.velocityY - this.radius) < 0)) this.velocityY = -this.velocityY;

        this.x += this.velocityX;
        this.y += this.velocityY;

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