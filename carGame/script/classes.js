/**
 * Returns a random integer value between the minimum and maximum number.
 * 
 * @param {number} min -minimum value (inlusive)
 * @param {number} max -maximum value (exclusive)
 * @returns {number}
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}





class HitBox {

    /**
     * representation of the hit box object 
     * 
     * @param {number} x -x-coordinate 
     * @param {number} y -y-coordinate
     * @param {number} w -width of the hitbox
     * @param {number} h -height of the hitbox
     */
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

    }

    //for drawing the hitbox
    draw() {
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = "red";
        ctx.fill();
    }


    /**
     * Checks if two hitboxes collide
     * 
     * @param {object} hitbox -a hitbox type object
     * @returns {boolean}
     */
    intersects(hitbox) {
        return (this.x < hitbox.x + hitbox.w &&
            this.x + this.w > hitbox.x &&
            this.y < hitbox.y + hitbox.h &&
            this.h + this.y > hitbox.y);
    }
}






class Player {

    /**
     * represents the player with the starting coordinates and the necessary resources.
     */
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
    /**
     * Represents the bullet projectile.
     * 
     * @param {number} x starting position of the bullet
     * @param {number} y starting y-coordinate of the bullet
     */
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

    }


}


class Loot {
    /**
     * represents the loot box that can restore the ammo of the car.
     * 
     * @param {number} x -x-coordinate for placing the loot box
     * @param {number} y -y-coordinate for placing the loot box
     */
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
    /**
     * Represents the police cars in the game
     * 
     * @param {number} x -x-coordinate for placing the adverseries
     * @param {number} y -y-coordinate for placing the adverseries
     * @param {number} w -width of the adverseries
     * @param {number} h -height of the adverseries
     */
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


    }
    moveAdverseries() {
        this.y += 1;
        this.drawHitBox();
        this.placeAdverseries();


    }
}





class CarGame {
    /**
     * Represents the car game, loads all the resources.    
     * 
     * @param {number} noOfPlayer -no of player that can be added to player--does not work
     * @param {number} backgroundImge -the background Image for the game 
     */
    constructor(noOfPlayer, backgroundImge) {
        this.noOfPlayer = noOfPlayer;
        this.backgroundImge = new Image();
        this.backgroundImge.src = backgroundImge;
        this.players = [];
        for (let i = 0; i < this.noOfPlayer; i++) {
            let p = new Player();
            p.placePlayer();
            this.players.push(p);

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





    /**
     * this method will make both loot and adverseries. is not very good generator of both things.
     */
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


                    }
                    this.adverseriesArr.push(new Adverseries(element, -101, 50, 101));
                }
            })
        }


    }


    /**for moving the things other than the player */
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
        /**
         * checks collision between the hitboxes of the player and the obstacles
         * @returns {boolean}
         */
    detectCollision() {
        let collision = false;
        this.adverseriesArr.forEach(element => {
            if (element.hitbox.intersects(this.players[0])) {

                collision = true;
            }

        })
        return collision;

    }

    /**
     * Returns the index of the loot that is in the array of loots- if the player touched the loot
     * @returns {number}
     */
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
    /**
     * Represents the Game--has the main game loop.
     * @param {HTMLelement} container -the div element that wraps the canvas
     */
    constructor(container) {
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
        this.container = container;
        ctx.font = "30px Comic Sans MS";
        ctx.textAlign = "center";
        ctx.fillStyle = "red";

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

                    break;
                case 39:
                    this.game.players[0].currentPosition++;
                    if (this.game.players[0].currentPosition > 2) {
                        this.game.players[0].currentPosition = 2;
                    }
                    this.right = true;

                    break;
                case 32:

                    if (this.ammoLeft > 0) {
                        let b = new Bullet(this.game.players[0].x, this.game.players[0].y);
                        this.bulletArr.push(b);
                        this.shoot = true;
                        this.ammoLeft -= 1;
                    }
            }
        });
    }

    /**
     * This will start the game
     */
    start() {
        ctx.fillText("Don't Smash the car!", 250, 90);
        ctx.font = "15px Comic Sans MS";
        ctx.fillText("To play this game, use the left/right arrow keys to move to the", 250, 270);
        ctx.fillText("respective directions and, use spacebar to shoot bullets", 250, 290);
        this.addEvents();

        this.createButton(this.startGame, "100px", "20px", "55%", "45%", false);

    }


    writeScore(score, ammo) {
            score *= 10;
            ctx.font = "30px Comic Sans MS";
            ctx.fillText(Math.floor(score), 50, 30);
            ctx.fillText(ammo, 450, 30);

        }
        /**this method will make sure the button will disappear before the game is started. */
    startGame() {
        this.deleteButton();
        this.gameLoop();
    }


    /**
     * The main game loop.
     * 
     * @returns null
     */
    gameLoop() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.game.loopBackGround();
        this.game.moveAdverseriesandLoot();
        this.collided = this.game.detectCollision();
        this.gotLoot = this.game.detectLoot();

        this.game.players.forEach(element => { //for animating the positions
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



        for (let i = 0; i < this.bulletArr.length; i++) { //checks collision between bullet and the obstacles
            for (let j = 0; j < this.game.adverseriesArr.length; j++) {

                if (this.bulletArr[i].hitbox.intersects(this.game.adverseriesArr[j])) {
                    this.bulletArr.splice(i, 1);
                    this.game.adverseriesArr.splice(j, 1);
                    this.score += 1;
                    break;

                }
            }
        }




        if (this.gotLoot > -1) { //touched loot box
            this.game.lootArr.splice(this.gotLoot, 1);
            this.ammoLeft = 10;
            this.gotLoot = -1;


        }

        if (this.collided) { //obstacle hit
            this.gameOver(this.animationId);
            return;
        }
        this.score += 0.01;
        this.writeScore(this.score, this.ammoLeft);

        this.animationId = requestAnimationFrame(this.gameLoop.bind(this));

    }





    gameOver(id) {
        this.writeScore(this.score, this.ammoLeft);
        ctx.fillText("Game Over", 250, 300);
        ctx.fillText("Play Again", 250, 350);
        this.createButton(this.restartButton, "50px", "50px", "61%", "48%", true);



    }
    restartButton() { //for restarting the game
        this.collided = false;
        this.game = new CarGame(1, "./images/road.png");
        this.animationId = 0;
        this.right = false;
        this.game.makeAdverseriesAndLoot();
        this.bulletArr = [];
        this.ammoLeft = 10;
        this.shoot = false;
        this.gotLoot = -1;
        this.score = 0;
        this.gameLoop();
        this.deleteButton();
    }

    deleteButton() {
        let btn = document.querySelector("button");

        btn.remove();
    }


    /**
     * For creating a button for the game restart and start.
     * 
     * @param {function} action -an event that needs to happen when the button is clicked.
     * @param {string} width -width of the button   
     * @param {string} height -height of the button  
     * @param {string} top -amount to be displaced from the top 
     * @param {string} left -amount to be displaced from the left 
     * @param {boolean} img -true if you want the restart icon 
     */
    createButton(action, width, height, top, left, img) {
        let btn = document.createElement("button");
        if (img) {
            let btnImg = document.createElement("img");
            btn.append(btnImg);
            btnImg.src = "./images/Flat_restart_icon.svg";
        } else {
            btn.innerText = "Start";
            btn.style.fontSize = "25px";

        }

        btn.addEventListener("click", action.bind(this));
        btn.style.position = "absolute";
        btn.style.width = width;
        btn.style.height = height;
        btn.style.top = top;
        btn.style.background = "transparent";
        btn.style.border = "none";
        btn.style.left = left;
        btn.style.cursor = "pointer";
        this.container.appendChild(btn);

    }




}