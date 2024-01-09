const main = document.getElementById("main");
console.log(main);

var box = document.createElement("div");
box.id = "box";
box.style.height = "100px";
box.style.width = "100px";
box.style.background = "#47a";
box.style.position = "relative";
box.style.border = "1px solid black";
main.appendChild(box);
var ball = document.createElement("div");
ball.id = "ball";
ball.style.height = "10px";
ball.style.width = "10px";
ball.style.background = "blue";
ball.style.position = "absolute";
ball.style.left = "45px";

ball.style.top = "45px";
ball.style.borderRadius = "50%";
box.appendChild(ball);
var ball = document.getElementById("ball");
var left = parseInt(ball.style.left);


flag = 0;

function animate() {


    ball.style.left = left + "px";
    console.log(ball.style.left, flag);
    if (!flag) {
        left += 1;
    }
    if (left > 90) {
        flag = 1; //the ball must change direction

    }
    if (flag) {
        console.log(flag);
        left -= 1;
        if (left < 0) {
            flag = 0;
        }
    }


}
setInterval(animate, 50);