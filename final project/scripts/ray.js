class Ray {
    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.xdir = Math.cos(angle * (Math.PI / 180));
        this.ydir = Math.sin(angle * (Math.PI / 180));

    }
    collides(boundaries) {
        let intersects = [];
        boundaries.forEach(element => {

            let point = this.liangBarsky(element);
            if (point !== null) {
                intersects.push(point);
            }
        });
        return intersects;
    }

    liangBarsky(boundary) {
        let x1 = this.x;
        let y1 = this.y;
        let x2 = this.x + this.xdir * 100;
        let y2 = this.y + this.ydir * 100;
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
            // console.log(p[i], q[i]);
            // // console.log(x1, y1, x2, y2, xwmin, ywmin, xwmax, ywmax);
            // console.log(t1, t2, q[i] / p[i]);

        }
        if (t1 > t2) {
            return null;

        }
        if (t1 < t2) {
            return {
                x: x1 + t1 * delX,
                y: y1 + t1 * delY
            }

        }


    }



}