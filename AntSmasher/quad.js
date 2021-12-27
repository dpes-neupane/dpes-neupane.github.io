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