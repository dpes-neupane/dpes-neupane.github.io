class HitBox {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

    }
    draw() {
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.fill();
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

    }


    placePlayer() {

        ctx.drawImage(this.image, this.x, this.y);


    }

    drawHitBox() {
        this.hitbox = new HitBox(this.x, this.y, this.w, this.h);
        this.hitbox.draw();
    }

    changePosition(currentPosition, right, move) {
        this.currentPosition = currentPosition;


        if (move) {
            if (right) {

                this.currentPosition = ++currentPosition;
                if (this.currentPosition > 2) {
                    this.currentPosition = 2;
                }
                if (this.x < this.positions[this.currentPosition]) {


                    this.x += 5;
                    this.placePlayer();
                    console.log(this.x);

                }

            } else {
                this.currentPosition = --currentPosition;
                if (this.currentPosition < 0) {
                    this.currentPosition = 0;
                }
                if (this.x > this.positions[this.currentPosition]) {
                    this.x -= 5;
                }
            }
        }




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



}