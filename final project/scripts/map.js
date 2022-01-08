class Map {
    constructor(canvas) {
        this.x = -100;
        this.y = -100;
        this.width = canvas.width;
        this.height = canvas.height;
        this.tiles = [];

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

        if (positionX % this.map1.tsize <= 10 || positionX % this.map1.tsize >= 90) {

            //check if the player position is in the left or right
            let leftDist = positionX - (tilePositionX * this.map1.tsize); //distance from the current position of player and current tile (x, y) coordinate
            let rightDist = ((tilePositionX + 1) * this.map1.tsize) - positionX + player.width; // distance from the current position of player and the next right tile coordinate
            let tileValueLeft;
            let tileValueRight;

            // console.log(leftDist, rightDist, tilePositionX);

            if (leftDist < rightDist) { //if the distance between the current tile and player position is less than the right it is in the left side of the current tile
                tileValueLeft = this.map1.getElement(tilePositionX - 1, tilePositionY, this.map1);
                if (tileValueLeft !== 1) {
                    moveLeft = false;
                }
            } else {
                tileValueRight = this.map1.getElement(tilePositionX + 1, tilePositionY, this.map1);

                if (tileValueRight !== 1) {
                    moveRight = false;
                }
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


        // let tilePositionX = Math.floor(positionX / this.map1.tsize);
        // let tilePositionY = Math.floor(positionY / this.map1.tsize);

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
        // this.tileMap = {
        //     cols: 10,
        //     rows: 10,
        //     tsize: 10,
        //     map: [
        //         1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        //         1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        //         1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        //         1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        //         1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        //         1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        //         1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        //         1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        //         1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        //         1, 1, 1, 1, 1, 1, 1, 1, 1, 1,

        //     ],
        //     getElement: function(row, col) {
        //         return this.map[row * this.cols + col];
        //     }
        // }

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