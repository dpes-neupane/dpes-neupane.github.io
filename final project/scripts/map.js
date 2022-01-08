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
        let currentTile = this.map1.getElement(tilePositionX, tilePositionY, this.map1);
        let up = Math.floor((positionY - 20) / this.map1.tsize);
        let down = Math.floor((positionY + 35) / this.map1.tsize);
        let left = Math.floor((positionX - 20) / this.map1.tsize);
        let right = Math.floor((positionX + 20) / this.map1.tsize);

        let tileUp = this.map1.getElement(tilePositionX, up, this.map1);
        let tileDown = this.map1.getElement(tilePositionX, down, this.map1);
        let tileLeft = this.map1.getElement(left, tilePositionY, this.map1);
        let tileRight = this.map1.getElement(right, tilePositionY, this.map1);
        if (tileUp !== 1) {
            moveUP = false;

        }
        if (tileDown !== 1) {
            moveDown = false;

        }
        if (tileLeft !== 1) {
            moveLeft = false;

        }
        if (tileRight !== 1) {
            moveRight = false;

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
                    tile.drawTile();
                }


            }
        }





        return {
            tiles: this.tiles,
            x: player.x,
            y: player.y
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