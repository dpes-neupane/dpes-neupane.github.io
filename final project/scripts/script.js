canvas = document.querySelector("canvas");
context = canvas.getContext("2d");
canvas.height = 670;
canvas.width = 1000;
let moveUP = 0;
let moveDown = 0;
let moveLeft = 0;
let moveRight = 0;
let mousemove = [];

var img = new Image();
// img.onload = function() {
//     knockoutAndRefill(50, 200, 700, 50, 75, 350);
// };
img.src = './images/wall2.png';




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




let player = new Player(150, 150);

let map = new Map(canvas);



function init() {
    context.clearRect(0, 0, canvas.width, canvas.height);



    context.fillRect(0, 0, canvas.width, canvas.height);
    // context.drawImage(img, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
    let tiles = map.makeMap();








    player.movePlayer(moveLeft, moveRight, moveDown, moveUP, tiles);
    player.draw(tiles);
    moveDown = false;
    moveLeft = false;
    moveRight = false;
    moveUP = false;

    requestAnimationFrame(init);
}

init();