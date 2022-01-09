class Map {
    constructor(canvas) {
        this.x = -100;
        this.y = -100;
        this.width = canvas.width;
        this.height = canvas.height;
        this.tiles = [];
        this.path = [];
        this.map1 = {
            cols: 20,
            rows: 20,
            tsize: 100,
            tiles: [
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2,
                2, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 2, 0, 1, 0, 0, 1, 0, 1, 2,
                2, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 2, 0, 1, 0, 0, 1, 0, 1, 2,
                2, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2,
                2, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 2, 1, 0, 0, 1, 0, 1, 1, 2,
                2, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 2, 1, 1, 0, 1, 1, 1, 1, 2,
                2, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 2, 0, 1, 1, 1, 0, 0, 1, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 1, 0, 0, 0, 0, 1, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2,

                2, 2, 2, 2, 2, 0, 0, 2, 0, 0, 2, 2, 0, 0, 0, 1, 1, 0, 1, 2,
                2, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 2,
                2, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 2,
                2, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 2,
                2, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 2,
                2, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 2,
                2, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 2,
                2, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 2,
                2, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 2,
                2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2,
                2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,

            ],
            getElement: function(col, row, map) {
                return this.tiles[row * map.cols + col];
            }

        };
        this.noTileInWindowX = this.width / this.map1.tsize;
        this.noTileInWindowY = this.width / this.map1.tsize;

    }



    checkMovement(player, moveLeft, moveRight, moveDown, moveUP) {

        let positionX = (player.x - this.x);
        let positionY = (player.y - this.y);
        let tilePositionX = player.tilePositionX;
        let tilePositionY = player.tilePositionY;


        if (positionX % this.map1.tsize <= 1) { // checks how near is it to the leftmost edge of the tile


            let tileValueLeft;


            tileValueLeft = this.map1.getElement(tilePositionX - 1, tilePositionY, this.map1);

            if (tileValueLeft !== 1) {
                moveLeft = false;
            }







        }
        if ((positionX + 20) % this.map1.tsize >= 90) { //checks how near it is to the rightmost edge of the tile
            let tileValueRight;

            tileValueRight = this.map1.getElement(tilePositionX + 1, tilePositionY, this.map1);

            if (tileValueRight !== 1) {
                moveRight = false;
            }
        }

        if (positionY % this.map1.tsize <= 10 || positionY % this.map1.tsize >= 90) {
            //same idea as the left-right one
            let upDist = positionY - (tilePositionY * this.map1.tsize);
            let downDist = ((tilePositionY + 1) * this.map1.tsize) - positionY + player.height;
            let tileValueDown;
            let tileValueUp;

            if (upDist > downDist) {
                tileValueDown = this.map1.getElement(tilePositionX, tilePositionY + 1, this.map1);
                if (tileValueDown !== 1) {
                    moveDown = false;
                }
            } else {
                tileValueUp = this.map1.getElement(tilePositionX, tilePositionY - 1, this.map1);
                if (tileValueUp !== 1) {
                    moveUP = false;
                }
            }


        }


        return {
            moveDown: moveDown,
            moveLeft: moveLeft,
            moveRight: moveRight,
            moveUP: moveUP
        }





    }





    //make a part of the map that only fits on the screen 
    drawPartOfMap(player) {
        this.tiles = [];
        let tilePositionX = player.tilePositionX;
        let tilePositionY = player.tilePositionY;





        for (let i = 0; i <= this.noTileInWindowX; i++) {
            for (let j = 0; j <= this.noTileInWindowY; j++) {
                let tile = this.map1.getElement(i, j, this.map1);
                if (tile != 1) {
                    let boundary = new Wall(i * this.map1.tsize + this.x, j * this.map1.tsize + this.y, this.map1.tsize, this.map1.tsize);
                    this.tiles.push(boundary);
                } else {
                    let tile = new Tile(i * this.map1.tsize + this.x, j * this.map1.tsize + this.y);
                    // tile.drawTile();
                }


            }
        }





        return {
            tiles: this.tiles,

        };
    }


    getPath() {

        for (let i = 3; i <= this.noTileInWindowX; i++) {
            for (let j = 3; j <= this.noTileInWindowY; j++) {


                let tile = this.map1.getElement(i, j, this.map1);
                if (tile === 1) {
                    let pathXY = {
                        i: i,
                        j: j
                    }
                    this.path.push(pathXY);
                }
            }
        }

    }




    putKeyInMap(demons) {
        let tileVal;

        let keyTilePositionX;
        let keyTilePositionY;

        let key;
        let placed = false;
        let maxCount = 100;
        while (!placed && maxCount) {
            tileVal = getRandomInt(0, this.path.length);
            keyTilePositionX = getRandomInt(0, 90);
            keyTilePositionY = getRandomInt(0, 90);
            key = new Key(this.path[tileVal].i * this.map1.tsize + keyTilePositionX + this.x, this.path[tileVal].j * this.map1.tsize + keyTilePositionY + this.y);
            if (!this.checkdist(demons, key)) {
                placed = true;
            }
            maxCount--;


        }
        return key;


    }

    putDoorInMap(demons, key) {
        let tileVal;

        let doorTilePositionX;
        let doorTilePositionY;

        let door;
        let placed = false;
        let maxCount = 100;
        while (!placed && maxCount) {
            tileVal = getRandomInt(0, this.path.length);
            doorTilePositionX = getRandomInt(0, 70);
            doorTilePositionY = getRandomInt(0, 70);
            door = new Door(this.path[tileVal].i * this.map1.tsize + doorTilePositionX + this.x, this.path[tileVal].j * this.map1.tsize + doorTilePositionY + this.y);
            if (!this.checkdist(demons, key, door)) {
                placed = true;
            }
            maxCount--;

        }
        return door;


    }


    //make sure the key is not too near the demons
    checkdist(demons, key, door) {
        let collides = false;
        if (!door) {
            demons.forEach(element => {
                let d = getDistance(element.x, element.y, key.x, key.y);
                if (d < 100) {
                    collides = true;
                }

            });
        } else {
            let d = getDistance(key.x, key.y, door.x, door.y);
            if (d < 300) {
                collides = true;
            }

            demons.forEach(element => {
                d = getDistance(element.x, element.y, door.x, door.y);
                if (d < 100) {
                    collides = true;
                }

            });

        }

        return collides;
    }




}



class Tile {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = "./images/only-walls.png";
        this.width = 100;
        this.height = 100;
        this.boundary = new Boundary(this.x, this.y, this.width, this.height);


    }
    drawTile() {


        context.drawImage(this.image, 0, 0, 100, 100, this.x, this.y, 100, 100);




    }



}


class Wall {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.boundary = new Boundary(this.x, this.y, this.w, this.h);
    }





}