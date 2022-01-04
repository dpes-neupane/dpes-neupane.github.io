canvas = document.querySelector("canvas");
context = canvas.getContext("2d");
canvas.height = 500;
canvas.width = 1000;
let moveUP = 0;
let moveDown = 0;
let moveLeft = 0;
let moveRight = 0;

var img = new Image();
// img.onload = function() {
//     knockoutAndRefill(50, 200, 700, 50, 75, 350);
// };
// img.src = 'https://picsum.photos/id/237/200/300';


function knockoutAndRefill(x0, y0, x1, y1, x2, y2) {
    context.save();
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.lineTo(x2, y2);
    context.closePath();
    context.clip();
    context.drawImage(img, 0, 0);
    context.restore();
}

window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowUp":
            moveUP = true;
            console.log(moveUP);
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
})


let player = new Player(500, 250);

function init() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    rays = player.createRays();
    // console.log(player.dir);

    player.movePlayer(moveLeft, moveRight, moveDown, moveUP);
    moveDown = false;
    moveLeft = false;
    moveRight = false;
    moveUP = false;
    requestAnimationFrame(init);
}

init();