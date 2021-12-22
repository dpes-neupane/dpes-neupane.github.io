button = document.querySelector(".button1");
console.log(button);

const points = [
    { x: 10, y: 20 },
    { x: 90, y: 60 },
    { x: 40, y: 40 },
    { x: 60, y: 20 },
    { x: 50, y: 30 }
];


button.addEventListener('click', function(event) {
    var box = document.createElement("div");
    box.className = "scatterBox";

    box.style.border = "1px solid black";
    box.style.position = "relative";
    box.style.width = "500px";
    box.style.height = "500px";


    document.getElementById("main_container").appendChild(box);

    for (var i = 0; i < points.length; i++) {

        var x = points[i].x * 5;
        var y = points[i].y * 5;
        var div = document.createElement("div");
        div.class = "points";
        div.style.background = "blue";
        div.style.position = "absolute";
        div.style.left = x + "px";
        div.style.top = y + "px";
        div.style.width = "10px";
        div.style.height = "10px";
        div.style.borderRadius = "50%";
        box.append(div);
        console.log(x, y);
    }


});