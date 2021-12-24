canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");



function animate() {
    ctx.beginPath();
    ctx.moveTo(100, 200);
    ctx.lineTo(300, 400);
    ctx.stroke();

}

animate();