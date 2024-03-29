class Ray {
    constructor(x, y, angle, raysize) {
        this.x = x;
        this.y = y;

        this.xdir = Math.cos(angle * (Math.PI / 180));
        this.ydir = Math.sin(angle * (Math.PI / 180));
        this.endpointX = this.x + this.xdir * raysize;
        this.endpointY = this.y + this.ydir * raysize;

    }
    collides(tiles) {
        let intersects;

        tiles.forEach(element => {

            let point = this.liangBarsky(element.boundary);
            if (point !== null && point != undefined) {
                if (intersects === undefined)
                    intersects = point;
                else {
                    let d1 = getDistance(this.x, this.y, intersects.x, intersects.y);
                    let d2 = getDistance(this.x, this.y, point.x, point.y);
                    if (d1 > d2) {
                        intersects = point;
                    }
                }
            }
        });

        return intersects;
    }

    liangBarsky(boundary) {
        let x1 = this.x;
        let y1 = this.y;
        let x2 = this.endpointX;
        let y2 = this.endpointY;
        let xwmin = boundary.x;
        let ywmin = boundary.y;
        let xwmax = boundary.x + boundary.w;
        let ywmax = boundary.y + boundary.h;
        let delX = x2 - x1;
        let delY = y2 - y1;
        let p1 = -delX;
        let p2 = delX;
        let p3 = -delY;
        let p4 = delY;
        let p = [p1, p2, p3, p4];
        let q1 = x1 - xwmin;
        let q2 = xwmax - x1;
        let q3 = y1 - ywmin;
        let q4 = ywmax - y1;
        let q = [q1, q2, q3, q4];
        let t1 = -1 * Infinity;
        let t2 = Infinity;
        for (let i = 0; i < 4; i++) {
            if (p[i] === 0 && q[i] < 0) {
                return null;
            }
            if (p[i] < 0) {
                t1 = Math.max(0, q[i] / p[i], t1);

            }
            if (p[i] > 0) {
                t2 = Math.min(1, q[i] / p[i], t2);
            }


        }
        if (t1 > t2) {
            return null;

        }
        if (t1 < t2) {
            return {
                x: x1 + t1 * delX,
                y: y1 + t1 * delY,
                x2: x1 + t2 * delX,
                y2: y1 + t2 * delY
            }

        }


    }



}