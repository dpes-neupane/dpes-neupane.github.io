function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}





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




}


class Bullet {
    constructor(x, y) {
        this.x = x + 20;
        this.y = y;
        this.w = 5;
        this.h = 10;
        this.hitbox = new HitBox(this.x, this.y, this.w, this.h);
    }


    moveBullet() {
        this.y -= 10;
        this.hitbox = new HitBox(this.x, this.y, this.w, this.h);
        this.hitbox.draw();
        // console.log(this.y);
    }


}


class Loot {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 100;
        this.h = 100;
        this.hitbox = new HitBox(this.x, this.y, this.w, this.h);
        this.image = new Image();
        this.image.src = "./images/loot.png";
    }
    placeLoot() {
        ctx.drawImage(this.image, this.x, this.y);
    }
    drawHitBox() {
        this.hitbox = new HitBox(this.x, this.y, this.w, this.h);
    }
    moveLoot() {
        this.y += 1;
        this.drawHitBox();
        this.placeLoot();


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
        this.image.src = "./images/police-car.png";
    }

    placeAdverseries() {
        ctx.drawImage(this.image, this.x, this.y);
    }

    drawHitBox() {
        this.hitbox = new HitBox(this.x, this.y, this.w, this.h);
        // this.hitbox.draw();

    }
    moveAdverseries() {
        this.y += 1;
        this.drawHitBox();
        this.placeAdverseries();


    }
}





class CarGame {
    constructor(noOfPlayer, backgroundImge) {
        this.noOfPlayer = noOfPlayer;
        this.backgroundImge = new Image();
        this.backgroundImge.src = backgroundImge;
        this.players = [];
        for (let i = 0; i < this.noOfPlayer; i++) {
            let p = new Player();
            p.drawHitBox();
            p.placePlayer();
            this.players.push(p);

            //add--feature: player coordinates for multiple players
        }
        this.x = 0;
        this.y = 0;
        this.y2 = 10;
        this.adverseriesArr = [];
        this.counter = 0;
        this.divider = getRandomInt(210, 300);
        this.lootArr = [];
        this.loot = 0;
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





    makeAdverseriesAndLoot() {
        this.positionsX = [80, 230, 370];
        let addLoot = false;
        this.counter++;
        if (this.counter % this.divider === 0) {
            this.counter = 0;
            this.loot++;
            if (this.loot % getRandomInt(2, 8) == 0) {
                this.loot = 0;
                addLoot = true;
            }
            this.positionsX.forEach(element => {
                let rInt = getRandomInt(0, 2);
                if (rInt) {
                    if (addLoot) {
                        this.lootArr.push(new Loot(element, -201));
                        console.log("loot");

                    }
                    this.adverseriesArr.push(new Adverseries(element, -101, 50, 101));
                }
            })
        }


    }



    moveAdverseriesandLoot() {
        this.adverseriesArr.forEach(element => {
            element.moveAdverseries();

        });

        this.adverseriesArr = this.adverseriesArr.filter(element => {
            return element.y < canvas.height;
        });
        this.lootArr.forEach(element => {
            element.moveLoot();

        });
        this.lootArr = this.lootArr.filter(element => {
            return element.y < canvas.height;
        });
        this.makeAdverseriesAndLoot();


    }

    detectCollision() {
        let collision = false;
        this.adverseriesArr.forEach(element => {
            if (element.hitbox.intersects(this.players[0])) {

                collision = true;
            }

        })
        return collision;

    }
    detectLoot() {
        let collision = -1;
        this.lootArr.forEach((element, index) => {
            if (element.hitbox.intersects(this.players[0])) {

                collision = index;

            }

        })
        return collision;

    }





}




class Game {
    constructor() {
        this.game = new CarGame(1, "./images/road.png");
        this.animationId = 0;
        this.right = false;
        this.game.makeAdverseriesAndLoot();
        this.collided = false;
        this.bulletArr = [];
        this.ammoLeft = 10;
        this.shoot = false;
        this.gotLoot = -1;
        this.score = 0;
    }

    addEvents() {
        window.addEventListener("keydown", (e) => {
            switch (e.keyCode) {
                case 37:
                    this.game.players[0].currentPosition--;
                    if (this.game.players[0].currentPosition < 0) {
                        this.game.players[0].currentPosition = 0;
                    }
                    this.right = false;
                    console.log("left");
                    break;
                case 39:
                    this.game.players[0].currentPosition++;
                    if (this.game.players[0].currentPosition > 2) {
                        this.game.players[0].currentPosition = 2;
                    }
                    this.right = true;
                    console.log("right");
                    break;
                case 32:
                    console.log("space");
                    if (this.ammoLeft > 0) {
                        let b = new Bullet(this.game.players[0].x, this.game.players[0].y);
                        this.bulletArr.push(b);
                        this.shoot = true;
                        this.ammoLeft -= 1;
                    }
            }
        });
    }
    writeScore(score, ammo) {
        score *= 10;
        ctx.font = "30px Comic Sans MS";
        ctx.strokeStyle = "red";
        ctx.fillText(Math.floor(score), 50, 30);
        ctx.fillText(ammo, 450, 30);

    }

    gameLoop() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.game.loopBackGround();
        this.game.moveAdverseriesandLoot();
        this.collided = this.game.detectCollision();
        this.gotLoot = this.game.detectLoot();

        this.game.players.forEach(element => {
            // element.drawHitBox();
            element.placePlayer();
            if (element.x < element.positions[element.currentPosition] && this.right) {
                element.changePositionRight();
            }
            if (element.x > element.positions[element.currentPosition] && !this.right) {
                element.changePositionLeft();
            }
        });

        this.bulletArr.forEach(element => {
            element.moveBullet();

        })
        this.bulletArr = this.bulletArr.filter(element => {
            return !(element.y < 0);
        });
        for (let i = 0; i < this.bulletArr.length; i++) {
            for (let j = 0; j < this.game.adverseriesArr.length; j++) {

                if (this.bulletArr[i].hitbox.intersects(this.game.adverseriesArr[j])) {
                    this.bulletArr.splice(i, 1);
                    this.game.adverseriesArr.splice(j, 1);
                    this.score += 1;
                    break;

                }
            }
        }
        // 



        if (this.gotLoot > -1) {
            this.game.lootArr.splice(this.gotLoot, 1);
            this.ammoLeft = 10;
            this.gotLoot = -1;


        }

        if (this.collided) {
            this.gameOver(this.animationId);
            return;
        }
        this.score += 0.01;
        this.writeScore(this.score, this.ammoLeft);

        this.animationId = requestAnimationFrame(this.gameLoop.bind(this));

    }




    gameOver(id) {
        this.writeScore(this.score, this.ammoLeft);
        cancelAnimationFrame(id);


    }




}