const carouselCont = document.getElementById("carousel-container");
carouselCont.style.width = "700px";;
carouselCont.style.height = "500px";
carouselCont.style.border = "2px solid black";
carouselCont.style.margin = "auto";
carouselCont.style.position = "relative";

let slide = document.getElementById("carousel-slide");

slide.style.width = "4900px";
slide.style.margin = "auto auto auto -700px";
slide.style.position = "relative";
// slide.style.float = "left";
// carouselCont.style.overflow = "hidden";
let imgArr = document.querySelectorAll("img");
imgArr.forEach(element => {
        element.style.float = "left";
        // element.style.position = "absolute";

    })
    // imgArr[0].style.left = "-700px";
    // imgArr[1].style.right = "0px";
    // for (let i = 2; i < imgArr.length; i++) {
    //     imgArr[i].style.left = (700 * (i - 1)) + "px";
    // }

//now have to move right
var id = 0;

// function moveRight() {
//     // console.log(imgArr[1].style.right);
//     for (let i = 2; i < imgArr.length; i++) {

//         imgArr[i].style.left = (parseInt(imgArr[i].style.left) - 100) + "px";
//     }
//     imgArr[1].style.left = (parseInt(imgArr[1].style.left) - 100) + "px";
//     console.log(parseInt(imgArr[0].style.left));

//     imgArr[0].style.left = (parseInt(imgArr[0].style.left) - 100) + "px";
//     console.log(parseInt(imgArr[0].style.left));
//     if (parseInt(imgArr[0].style.left) >= -1300) {
//         id = requestAnimationFrame(moveRight);
//     }
//     // id = requestAnimationFrame(moveRight);
//     console.log(imgArr[0].style.left, id);
//     // setInterval(moveRight, 1000)


// }
// // id = requestAnimationFrame(moveRight);

// // cancelAnimationFrame(id);
// moveRight();
// // setInterval(moveRight, 3000);