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
let demon = new Demon(350, 200, 50, 50, 2);

let map = new Map(canvas, player);



function init() {
    context.clearRect(0, 0, canvas.width, canvas.height);



    context.fillRect(0, 0, canvas.width, canvas.height);
    // context.drawImage(img, 0, 0, 500, 400, 0, 0, canvas.width, canvas.height);
    let tiles = map.drawPartOfMap(player);
    // console.log(tiles);





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
    demon.drawSprite();
    moveDown = false;
    moveLeft = false;
    moveRight = false;
    moveUP = false;

    requestAnimationFrame(init);
}

init();