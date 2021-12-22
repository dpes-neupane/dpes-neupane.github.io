const main = document.getElementById("main");
console.log(main);

document.addEventListener("load", function() {
    var box = document.createElement("div");
    box.style.backgroundColor = "red";
    main.append(box);
});