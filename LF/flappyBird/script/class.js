SPRITEHEIGHT = 41;



/**
 * Returns a random integer value between the minimum and maximum number.
 * 
 * @param {number} min -minimum value (inlusive)
 * @param {number} max -maximum value (exclusive)
 * @returns number
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
     * @param {object} context - the drawing context of the canvas
     */
    constructor(x, y, w, h, context) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.ctx = context;

    }

    //for drawing the hitbox
    draw() {
        this.ctx.fillRect(0, 0, this.w, this.h);
        this.ctx.fillStyle = "black";
        this.ctx.fill();
    }


    /**
     * Checks if two hitboxes collide
     * 
     * @param {object} hitbox -a hitbox type object
     * @returns boolean
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
    constructor(canvas, sx, sy, sw, sh) {
        this.x = 100;
        this.y = 250;
        this.w = 30;
        this.h = 30;
        this.sx = sx;
        this.sy = sy;
        this.sw = sw;
        this.sh = sh;
        this.placement = 1;
        this.image = new Image();
        this.image.src = "./assets/flappyBird.png";
        this.canvasRect = canvas;
        this.ctx = canvas.getContext("2d");

        this.currentPosition = 0;
        this.hitbox = new HitBox(this.x - 5, this.y - 5, this.w, this.h, this.ctx);
        this.canvas = canvas;
        this.speed = 3;
        this.angle = 45;
        this.spriteNo = 0;
    }

    /**
     * to draw the still image of the player
     */
    placePlayer() {
        this.ctx.drawImage(this.image, this.sx, this.sy, this.sw, this.sh, this.x, this.y, this.w, this.h);

    }


    /**
     * It will move the player up if the up button is pressed else it will just make the player fall.
     * 
     * @param {boolean} jump -player pressed the up button 
     */
    movement(jump) {
        this.speedY = this.speed * Math.sin(this.angle * Math.PI / 180);
        this.y += this.speedY;
        this.hitbox = new HitBox(this.x - 5, this.y - 5, this.w, this.h, this.ctx);

        if (jump) {

            //rotate the sprite upwards when falling
            this.y -= 2 * this.speedY;
            this.ctx.save();
            this.ctx.translate(this.x, this.y);
            this.ctx.rotate(-10 * Math.PI / 180); //10 degrees sloping upwards
            this.animate();

            this.ctx.restore();


        } else {
            //rotate the sprite downwards when falling
            this.ctx.save();
            this.ctx.translate(this.x, this.y);
            this.ctx.rotate(15 * Math.PI / 180); //15 degrees sloping downwards

            this.ctx.drawImage(this.image, this.sx, this.sy, this.sw, this.sh, 0, 0, this.w, this.h);

            this.ctx.restore();


        }



        if (this.y >= 490) {
            this.y = 490;
        }

    }

    /**
     * for animating the player's sprite
     */
    animate() {
        this.spriteNo %= 3;
        this.ctx.drawImage(this.image, this.sx, this.sy + SPRITEHEIGHT * this.spriteNo, this.sw, this.sh, 0, 0, this.w, this.h);
        this.spriteNo++;
    }



}

















class Pipe {
    /**
     * represents a pipe in the game
     * 
     * @param {number} x -x-coordinate of the pipe
     * @param {number} y -y-coordinate of the pipe
     * @param {number} h -height of the pipe
     * @param {object} context -canvas context object
     * @param {number} sx -x-coordinate of the pipe in the spritesheet
     * @param {number} sy -y-coordinate of the pipe in the spritesheet
     * @param {number} sw -width of the sprite
     * @param {number} sh -height of hte sprite
     */
    constructor(x, y, h, context, sx, sy, sw, sh) {
        this.x = x;
        this.y = y;
        this.w = 70;
        this.h = h;
        this.hitbox = new HitBox(this.x, this.y, this.w, this.h);
        this.ctx = context;
        this.image = new Image();
        this.image.src = "./assets/flappyBird.png";
        this.sx = sx;
        this.sy = sy;
        this.sw = sw;
        this.sh = sh;
    }

    /**
     * for drawing the hitbox around the pipe.
     */
    placePipes() {
        this.hitbox.draw();
    }

    /**
     * for moving the pipes towards the player
     */
    movePipe() {
        this.x -= 2;

        this.hitbox = new HitBox(this.x, this.y, this.w, this.h, this.ctx);

        this.ctx.drawImage(this.image, this.sx, this.sy, this.sw, this.sh, this.x, this.y, this.w, this.h);

    }








}









class FlappyGame {
    /**
     * Represents the flappy game, loads all the resources.    
     * 
     * @param {number} noOfPlayer -no of player that can be added to player--does not work
     * @param {number} backgroundImge -the background Image for the game 
     * @param {object}-- canvas - canvas object
     */
    constructor(noOfPlayer, backgroundImge, canvas) {
        this.noOfPlayer = noOfPlayer;
        this.backgroundImge = new Image();
        this.backgroundImge.src = backgroundImge;
        this.players = [];
        for (let i = 0; i < this.noOfPlayer; i++) {
            let p = new Player(canvas, 180, 514, 26, 19);
            this.players.push(p);

        }
        this.x = 0; //for drawing the background image
        this.y = 0;
        this.x2 = canvas.width * 2; // for drawing the second background image
        this.pipeArr = []; //holds the obstacles of the game
        this.counter = 0;
        this.divider = getRandomInt(210, 300);

        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;

    }


    drawBackground() {
        this.ctx.drawImage(this.backgroundImge, this.x, this.y, this.canvas.width * 2, this.canvas.height);

    }

    loopBackGround() {
        this.ctx.drawImage(this.backgroundImge, this.x, this.y, this.canvas.width * 2, this.canvas.height);
        this.x -= 1;
        this.ctx.drawImage(this.backgroundImge, this.x2, this.y, this.canvas.width * 2, this.canvas.height);
        this.x2 -= 1;
        if (this.x2 == 0) {
            this.x = this.canvas.width * 2;
        }

        if (this.x == 0) {
            this.x2 = this.canvas.width * 2;
        }

    }

    generatePipes() {
        //make sure the generated pipe is not very hard to pass through
        //and the further it gets built the more harder it should be to pass
        // if(this.pipeArr[this.pipeArr-1].x)
        let lastPipe = null;
        let diffBetnPipes = -1;
        if (this.pipeArr.length > 1) {
            lastPipe = this.pipeArr[this.pipeArr.length - 1];

        }
        if (lastPipe !== null) {
            diffBetnPipes = 610 - lastPipe[0].x; //get the difference between the last pipe and to be generated one
            if (diffBetnPipes < 80) { // make sure they do not stack on each other
                return;
            }

        }

        let middleHeight = 250; // the height of the pipe when both up and down pipes make it so that the player must pass through the middle of the screen

        if (diffBetnPipes > 130) {
            let up = getRandomInt(0, 2); //this will make sure that the passage through the pipes are either up or down randomly
            if (up) { //get the way upper than the middle
                middleHeight = getRandomInt(150, 250);
            } else {
                middleHeight = getRandomInt(250, 300);
            }
        } else if (lastPipe != null) {
            middleHeight = lastPipe[0].h; //if the pipes are near to each other the passage between are aligned
        }


        let pipeUp = new Pipe(610, 0, middleHeight, this.ctx, 87, 503, 42, 251);
        let diffBetPipe = getRandomInt(70, 100);
        let pipeDown = new Pipe(610, middleHeight + diffBetPipe, 490 - middleHeight - diffBetPipe + 30, this.ctx, 43, 505, 42, 251);
        if (this.pipeArr.length < 10) {
            this.pipeArr.push([pipeUp, pipeDown]);

        }

    }

    movePipes(score) {
        let s = score;
        this.pipeArr.forEach(element => {
            element[0].movePipe();
            if (element[0].x === 100) {
                s += 1;
            }
            element[1].movePipe();
        })
        return s;
    }




    /**
     * checks collision between the hitboxes of the player and the obstacles
     * @returns boolean
     */
    detectCollision() {
        let collision = false;
        this.pipeArr.forEach(element => {
            if (element[0].hitbox.intersects(this.players[0]) || element[1].hitbox.intersects(this.players[0])) {

                collision = true;
            }

        })
        return collision;

    }




}
























class Game {
    /**
     * Represents the Game--has the main game loop.
     * 
     * @param {HTMLelement} container -the div element that wraps the canvas
     * @param {string} key- a string value, should be equal to js event.key values
     */
    constructor(container, key) {
        this.containerCanvas = document.querySelector(container + " canvas");
        this.ctx = this.containerCanvas.getContext("2d");
        this.containerCanvas.width = 600;
        this.containerCanvas.height = 600;
        this.container = document.querySelector(container);
        this.container.style.position = "relative";
        this.score = 0;
        this.speed = 1;
        this.game = new FlappyGame(1, "./assets/background/full-background.png", this.containerCanvas);
        this.ctx.textAlign = "center";
        this.jump = false;
        this.key = key;
        if (this.key === "space") {
            this.key = " ";
        }
        this.counter = 1;
        this.divider = getRandomInt(2, 6);
        this.collided = false;
        if (window.localStorage.getItem("highscore") === null) {
            window.localStorage.setItem("highscore", "0");
        }
        this.highscore = window.localStorage.getItem("highscore");

    }


    addEvents() {
        window.addEventListener("keydown", (e) => {

            switch (e.key) {

                case this.key:


                    this.jump = true;


            }
        });
        window.addEventListener("keyup", (e) => {
            switch (e.key) {

                case this.key:
                    this.jump = false;


            }
        });
    }











    /**
     * This will start the game
     */
    start() {
        this.ctx.font = "30px Comic Sans MS";
        this.ctx.fillText("Flappy Bird", 300, 90);
        this.ctx.font = "15px Comic Sans MS";
        if (this.key === " ") {
            this.ctx.fillText("To play this game, use the " + "space" + " to move  the", 300, 270);

        } else {
            this.ctx.fillText("To play this game, use the " + this.key + " to move  the", 300, 270);

        }
        this.ctx.fillText("bird up", 300, 290);
        this.addEvents();

        this.createButton(this.startGame, "100px", "20px", "55%", "41%", false);

    }


    writeScore(score, highscore) {

        this.ctx.font = "30px Comic Sans MS";
        this.ctx.fillText("SCORE: " + score, 100, 30);
        this.ctx.fillText("H-Score: " + highscore, 500, 30);


    }


    /**this method will make sure the button will disappear before the game is started. */
    startGame() {

        this.deleteButton();


        this.game.drawBackground();
        this.game.players.forEach(element => {
            console.log(element)
            element.placePlayer();
        });


        this.gameLoop();






    }

    /**
     * The main game loop.
     * 
     * @returns null
     */
    gameLoop() {

        this.ctx.clearRect(0, 0, this.containerCanvas.width, this.containerCanvas.height);
        this.collided = this.game.detectCollision();
        this.game.loopBackGround();

        this.game.players.forEach(element => { //for animating the positions


            element.movement(this.jump);


        });

        //for deleting the elements that are outside the game's boundaries
        this.game.pipeArr = this.game.pipeArr.filter(element => {
            return !(element[0].x < -70);
        })




        this.score = this.game.movePipes(this.score);


        if (this.collided || this.game.players[0].y >= 490 || this.game.players[0].y <= 0) { //obstacle hit
            this.gameOver();
            return;
        }



        this.writeScore(this.score, this.highscore);

        if (this.score > this.highscore) {
            this.highscore = this.score;
        }



        let gameMoved = 80;
        if (this.game.x % gameMoved === 0) { //when the game moves 80px the counter increases. 
            this.counter++;

        }
        if (this.counter % this.divider === 0) {
            this.counter = 1;
            this.game.generatePipes();
            this.divider = getRandomInt(2, 6);
        }



        requestAnimationFrame(this.gameLoop.bind(this));


    }



    gameOver() {
        this.writeScore(this.score, this.highscore);
        localStorage.setItem("highscore", this.highscore);
        this.ctx.fillText("Game Over", 300, 300);
        this.ctx.fillText("Play Again", 300, 350);
        this.createButton(this.restartButton, "50px", "50px", "60%", "45%", true);

    }


    restartButton() { //for restarting the game
        this.collided = false;

        this.counter = 1;
        this.divider = getRandomInt(1, 6);

        this.score = 0;
        this.speed = 1;
        this.game = new FlappyGame(1, "./assets/background/full-background.png", this.containerCanvas);
        this.gameLoop();
        this.deleteButton();
    }



    deleteButton() {
        let btn = document.querySelector("#" + this.container.id + "-btn");

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
        btn.id = this.container.id + "-btn";
        if (img) {
            let btnImg = document.createElement("img");
            btn.append(btnImg);
            btnImg.src = "./assets/redo-alt-solid.svg";
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