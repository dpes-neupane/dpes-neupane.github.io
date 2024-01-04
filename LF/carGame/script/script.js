const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 600;
const container = document.getElementById("container");
container.style.position = "relative";


const game = new Game(container);
game.start();