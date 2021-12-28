const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 600;
// let right = true;
// let move = false;
// const game = new Game(1, "./images/road.png");
// const player = new Player();
// game.makeAdverseries();
// let animationId = 0;
// let collided = false;
// let shoot = false;
// let bulletArr = [];


// window.addEventListener("keydown", (e) => {
//     switch (e.keyCode) {
//         case 37:
//             console.log('left');
//             right = false;
//             move = true;
//             player.currentPosition--;
//             if (player.currentPosition < 0) {
//                 player.currentPosition = 0;
//             }
//             break;
//             // case 38:
//             //     console.log('up');
//             //     break;
//         case 39:
//             console.log('right');
//             right = true;
//             move = true;
//             player.currentPosition++;
//             if (player.currentPosition > 2) {
//                 player.currentPosition = 2;
//             }



//             break;
//         case 32:
//             shoot = true;

//             bullet = new Bullet(player.x, player.y);
//             bulletArr.push(bullet);
//             index++;

//             console.log("space");
//     }
// });

function init() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);



    game.loopBackGround();

    if (player.x < player.positions[player.currentPosition] && right) {
        player.changePositionRight();

    }
    if (player.x > player.positions[player.currentPosition] && !right) {
        player.changePositionLeft();
    }

    game.moveAdverseries();
    collided = game.detectCollision(player);
    player.drawHitBox();
    player.placePlayer();
    if (collided) {
        console.log(collided);
        cancelAnimationFrame(animationId);
        return;
    }
    if (shoot) {

        bullet.moveBullet();
    }


    animationId = requestAnimationFrame(init);
}

// init();

const game = new Game();
game.addEvents();
game.gameLoop();