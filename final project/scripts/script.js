canvas = document.querySelector("canvas");
context = canvas.getContext("2d");
canvas.height = 710;
canvas.width = 1000;
let moveUP = 0;
let moveDown = 0;
let moveLeft = 0;
let moveRight = 0;
let mousemove = [];

var img = new Image();

img.src = './images/only-walls.png';




window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowUp":
            moveUP = true;

            break;
        case "ArrowDown":
            moveDown = true;
            break;
        case "ArrowLeft":
            moveLeft = true;
            break;
        case "ArrowRight":
            moveRight = true;
            break;
    }
});




let player = new Player(10, 10);

let map = new Map(canvas, player);
let demon = new Demon(340, 200, 50, 50, 2);
let light = new Light(390, 210, 10);
let demon1 = new Demon(320, 650, 50, 50, 1);
let light1 = new Light(310, 660, 10);
let demon2 = new Demon(500, 470, 50, 50, 4);
let light2 = new Light(510, 520, 10);

let demon3 = new Demon(950, 290, 50, 50, 2);
let light3 = new Light(985, 290, 10);
demon.generateFireBall();
demon.periodicFireBall(2500);
demon1.generateFireBall();
demon1.periodicFireBall(1500);
demon2.generateFireBall();
demon2.periodicFireBall(2000);
demon3.generateFireBall();
demon3.periodicFireBall(2000);
demons = [demon, demon1, demon2, demon3];


map.getPath();
let key = map.putKeyInMap(demons);
let door = map.putDoorInMap(demons, key);
let openDoor = false;

function init() {
    context.clearRect(0, 0, canvas.width, canvas.height);


    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    // context.drawImage(img, 0, 0, 500, 400, 0, 0, canvas.width, canvas.height);
    let tiles = map.drawPartOfMap(player);
    light.shine(tiles.tiles);
    light1.shine(tiles.tiles);
    light2.shine(tiles.tiles);
    light3.shine(tiles.tiles);
    let keyFound = key.checkCollision(player);
    if (keyFound || openDoor) {
        door.light.shine(tiles.tiles);
        door.drawDoor(true);
        openDoor = true;
    }


    let movement = map.checkMovement(player, moveLeft, moveRight, moveDown, moveUP);
    if (movement) {
        moveDown = movement.moveDown;
        moveLeft = movement.moveLeft;
        moveRight = movement.moveRight;
        moveUP = movement.moveUP;
        // console.log(movement.moveDown, movement.moveLeft, movement.moveRight, movement.moveUP)
    }

    player.movePlayer(moveLeft, moveRight, moveDown, moveUP, tiles);


    player.draw(tiles.tiles);
    if (keyFound || openDoor) {

        door.drawDoor(true);
    }

    light.drawSprite();
    light1.drawSprite();
    light2.drawSprite();
    light3.drawSprite();
    demon.drawSprite();

    demon1.drawSprite();
    demon2.drawSprite();
    demon3.drawSprite();

    let collided1 = demon.shootFireBall(player);
    let collided2 = demon1.shootFireBall(player);
    let collided3 = demon2.shootFireBall(player);
    let collided4 = demon3.shootFireBall(player);
    if (collided1 || collided2 || collided3 || collided4) {
        return;
    }
    moveDown = false;
    moveLeft = false;
    moveRight = false;
    moveUP = false;



    if (!keyFound && !openDoor) {
        key.drawKey(player);

    }


    requestAnimationFrame(init);
}

init();