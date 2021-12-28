const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 600;
let right = true;
let move = false;
const game = new Game(1, "./images/road.png");


window.addEventListener("keyup", (e) => {
    switch (e.keyCode) {
        case 37:
            console.log('left');
            right = false;
            move = true;
            break;
            // case 38:
            //     console.log('up');
            //     break;
        case 39:
            console.log('right');
            right = true;
            move = true;
            break;
            // case 40:
            //     console.log('down')
    }
});

function init() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //now make a background

    // game.drawBackGround();
    game.loopBackGround();


    let player = new Player();
    player.drawHitBox();
    player.placePlayer();
    player.changePosition(0, right, move);


    requestAnimationFrame(init);
}

init();