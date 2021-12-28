class HitBox {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

    }
    draw() {
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = "red";
        ctx.fill();
    }
    intersects(hitbox) {
        return (this.x < hitbox.x + hitbox.w &&
            this.x + this.w > hitbox.x &&
            this.y < hitbox.y + hitbox.h &&
            this.h + this.y > hitbox.y);
    }
}






class Player {
    constructor() {
        this.x = 80;
        this.y = 500;
        this.w = 50;
        this.h = 93;
        this.placement = 1;
        this.image = new Image();
        this.image.src = "./images/user-car.png";
        this.canvasRect = canvas.getBoundingClientRect();
        this.positions = [80, 230, 370];
        this.currentPosition = 0;
        this.hitbox = new HitBox(this.x, this.y, this.w, this.h);

    }


    placePlayer() {

        ctx.drawImage(this.image, this.x, this.y);


    }

    drawHitBox() {

        this.hitbox.draw();
    }

    changePositionRight() {
        this.x += 5;

    }

    changePositionLeft() {
        this.x -= 5;
    }

    shootBullets() {

    }


}




class Adverseries {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.hitbox = new HitBox(this.x, this.y, this.w, this.h);
        this.image = new Image();
        this.image.src = "./images/police-car-ulta.png";
    }

    placeAdverseries() {
        ctx.drawImage(this.image, this.x, this.y);
    }

    drawHitBox() {
        this.hitbox = new HitBox(this.x, this.y, this.w, this.h);
        this.hitbox.draw();

    }
    moveAdverseries() {
        this.y += 1;


    }
}





class Game {
    constructor(noOfPlayer, backgroundImge) {
        this.noOfPlayer = noOfPlayer;
        this.backgroundImge = new Image();
        this.backgroundImge.src = backgroundImge;
        this.players = [];
        for (let i = 0; i < this.noOfPlayer; i++) {
            this.players.push(new Player()); //add--feature: player coordinates for multiple players
        }
        this.x = 0;
        this.y = 0;
        this.y2 = 10;
        this.adverseriesArr = [];
    }
    drawBackGround() {
        ctx.drawImage(this.backgroundImge, this.x, this.y, 500, 1000);
        // console.log(this.backgroundImge)
    }


    loopBackGround() {

        ctx.drawImage(this.backgroundImge, this.x, this.y, );
        this.y += 2;
        ctx.drawImage(this.backgroundImge, this.x, this.y2 - 1000, );
        this.y2 += 2;

        if (this.y2 >= canvas.height + 400) {
            this.y = 0;
        }
        if (this.y2 >= canvas.height + 400) {
            this.y2 = 0;
        }



    }


    makeAdverseries() {
        this.adverseries = new Adverseries(80, -50, 50, 101);
        this.adverseriesArr.push(this.adverseries);






    }
    moveAdverseries() {
        if (this.adverseries == undefined) return;
        this.adverseries.drawHitBox();
        this.adverseries.placeAdverseries();
        this.adverseries.moveAdverseries();
        if (this.adverseries.y > canvas.height) {
            delete this.adverseries;
            console.log("adverseries deleted");
            this.makeAdverseries();
        }
    }

    detectCollision(player, id) {
        let collision = false;
        this.adverseriesArr.forEach(element => {
            if (element.hitbox.intersects(player)) {

                collision = true;
            }

        })
        return collision;

    }




}