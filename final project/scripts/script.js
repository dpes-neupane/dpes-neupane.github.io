canvas = document.querySelector("canvas");
container = document.getElementById("container-1");
context = canvas.getContext("2d");
canvas.height = 710;
canvas.width = 1000;
let moveUP = 0;
let moveDown = 0;
let moveLeft = 0;
let moveRight = 0;
let mousemove = [];
let player = map1.player;
player = new Player(player[0], player[1]);
let counter = map1.counter;
let ids = [];
let demons = map1.map[0].demons;
let demonsArr = [];
let lightsArr = [];
let mapNo = 0; //the map is in an array 
let keyFound = false;
demons.forEach(element => {
    let demon = new Demon(element[0], element[1], element[2], element[3], element[4]);
    demonsArr.push(demon);
    demon.generateFireBall();
    let id = demon.periodicFireBall(2500);
    ids.push(id);
});
let lights = map1.map[0].lights;
lights.forEach(l => {
    let light = new Light(l[0], l[1], l[2]);
    lightsArr.push(light);

})
let map = new Map(canvas, player, map1.map[0]);
map.getPath();
let doorCollision = false;
let key = map.putKeyInMap(demonsArr);
let door = map.putDoorInMap(demonsArr, key);
let openDoor = false;
let startTimer = false;
let img = new Image();
let collided = false;

let id = setInterval(() => {
    if (startTimer) {

        counter--;
    }
}, 1000);
ids.push(id);




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
function createButton(action, width, height, top, left, img) {
    let btn = document.createElement("button");
    btn.id = container.id + "-btn";
    if (img) {
        let btnImg = document.createElement("img");
        btn.append(btnImg);
        btnImg.src = "./images/redo-alt-solid.svg";
    } else {
        btn.innerText = "Start";
        btn.style.fontSize = "25px";

    }

    btn.addEventListener("click", action);
    btn.style.position = "absolute";
    btn.style.width = width;
    btn.style.height = height;
    btn.style.top = top;
    // btn.style.background = "transparent";
    btn.style.border = "none";
    btn.style.left = left;
    btn.style.cursor = "pointer";
    container.appendChild(btn);

}




function nextMap() {
    ids.forEach(id => {

        clearInterval(id);
    })
    moveUP = 0;
    moveDown = 0;
    moveLeft = 0;
    moveRight = 0;
    mousemove = [];
    player = map1.player;
    keyFound = false;
    player = new Player(player[0], player[1]);
    console.log(player);
    doorCollision = false;
    counter = map1.counter;
    ids = [];
    demons = map1.map[1].demons;
    demonsArr = [];
    lightsArr = [];
    mapNo = 1;
    lights = map1.map[1].lights;
    lights.forEach(l => {
        let light = new Light(l[0], l[1], l[2]);
        lightsArr.push(light);

    })
    map = new Map(canvas, player, map1.map[1]);
    map.getPath();

    key = map.putKeyInMap(demons);
    door = map.putDoorInMap(demons, key);
    openDoor = false;
    startTimer = false;
    img = new Image();
    collided = false;
    context.fillStyle = "red";
    context.font = "30px Comic Sans MS";
    id = setInterval(() => {
        if (startTimer) {
            console.log(counter, mapNo);
            counter--;
        }
    }, 1000);
    ids.push(id);

    demons.forEach(element => {
        let demon = new Demon(element[0], element[1], element[2], element[3], element[4]);
        demonsArr.push(demon);
        demon.generateFireBall();
        let id = demon.periodicFireBall(2500);
        ids.push(id);
    });
    init();

}


function gameOver(resetAction, playedAll) {
    context.font = "30px Comic Sans MS";
    context.fillStyle = "red";
    context.fillText("Play Again??", 440, 390);
    console.log(playedAll)
    if (playedAll) {
        mapNo = 0;
        context.fillText("You Won", 440, 350);

    } else {
        context.fillText("Game Over", 440, 350);

    }
    ids.forEach(id => {
        clearInterval(id);
    })
    moveUP = 0;
    moveDown = 0;
    moveLeft = 0;
    moveRight = 0;
    mousemove = [];
    player = map1.player;
    keyFound = false;
    player = new Player(player[0], player[1]);
    counter = map1.counter;
    ids = [];
    demons = map1.map[0].demons;
    demonsArr = [];
    lightsArr = [];
    doorCollision = false;
    lights = map1.map[0].lights;
    lights.forEach(l => {
        let light = new Light(l[0], l[1], l[2]);
        lightsArr.push(light);

    })
    map = new Map(canvas, player, map1.map[0]);
    map.getPath();

    key = map.putKeyInMap(demonsArr);
    door = map.putDoorInMap(demonsArr, key);
    openDoor = false;
    startTimer = false;
    img = new Image();
    collided = false;

    id = setInterval(() => {
        if (startTimer) {

            counter--;
        }
    }, 1000);
    ids.push(id);

    createButton(resetAction, "50px", "50px", "250px", "670px", true);

}



function deleteButton() {
    let btn = document.querySelector("#" + this.container.id + "-btn");

    btn.remove();
}








function init() {
    context.clearRect(0, 0, canvas.width, canvas.height);


    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    // context.drawImage(img, 0, 0, 500, 400, 0, 0, canvas.width, canvas.height);
    let tiles = map.drawPartOfMap(player);
    lightsArr.forEach(element => {
        element.shine(tiles.tiles);
    });
    keyFound = key.checkCollision(player);
    if (keyFound || openDoor) {
        door.light.shine(tiles.tiles);
        door.drawDoor(true);
        openDoor = true;
        startTimer = true;
    }


    let movement = map.checkMovement(player, moveLeft, moveRight, moveDown, moveUP);
    if (movement) {
        moveDown = movement.moveDown;
        moveLeft = movement.moveLeft;
        moveRight = movement.moveRight;
        moveUP = movement.moveUP;
    }
    // console.log(player);

    player.movePlayer(moveLeft, moveRight, moveDown, moveUP, tiles);


    player.draw(tiles.tiles);
    if (keyFound || openDoor) {

        door.drawDoor(true);
        door.startTimer(counter);


    }
    lightsArr.forEach(element => {
        element.drawSprite();
    });


    for (let i = 0; i < demonsArr.length; i++) {
        demonsArr[i].drawSprite();
        collided = demonsArr[i].shootFireBall(player);
        if (collided) {
            console.log(collided);
            gameOver(resetEverything, false);
            cancelAnimationFrame(rid);

            return;
        }
    }

    moveDown = false;
    moveLeft = false;
    moveRight = false;
    moveUP = false;



    if (!keyFound && !openDoor) {
        key.drawKey(player);

    }
    if (counter === 0) {
        gameOver(resetEverything, false);
        cancelAnimationFrame(rid);
        return;
    }
    doorCollision = door.checkCollision(player);
    if (doorCollision && mapNo === 1) {
        gameOver(resetEverything, true);
        cancelAnimationFrame(rid);
        return;
    }
    if (doorCollision && openDoor) {
        nextMap();
        cancelAnimationFrame(rid);

    }




    rid = requestAnimationFrame(init);
}

function resetEverything() {
    demons.forEach(element => {
        let demon = new Demon(element[0], element[1], element[2], element[3], element[4]);
        demonsArr.push(demon);
        demon.generateFireBall();
        let id = demon.periodicFireBall(2500);
        ids.push(id);
    });
    init();
    deleteButton();
    // console.log("reset");

}
// init();
nextMap();