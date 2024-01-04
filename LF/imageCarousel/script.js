const carouselCont = document.getElementById("carousel-container");
carouselCont.style.width = "700px";;
carouselCont.style.height = "500px";
carouselCont.style.border = "2px solid black";
carouselCont.style.margin = "auto";
carouselCont.style.position = "relative";
carouselCont.style.overflow = "hidden";

let slide = document.getElementById("carousel-slide");

slide.style.width = "4900px";
slide.style.margin = "auto auto auto -700px";
slide.style.position = "absolute";
slide.style.left = "0px";
slide.style.right = "0px";






const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
btn1.style.position = "relative";
btn1.style.opacity = "40%";
btn1.style.width = "50px";
btn1.style.height = "50px";
btn1.style.top = "250px";


btn2.style.position = "relative";
btn2.style.opacity = "40%";
btn2.style.width = "50px";
btn2.style.height = "50px";
btn2.style.top = "250px";
btn2.style.left = "600px";



let imgArr = document.querySelectorAll("img");
imgArr.forEach(element => {
    element.style.float = "left";


})
radioBtn = []; //this will hold the radio button
const radio1 = document.getElementById("img1");
const radio2 = document.getElementById("img2");
const radio3 = document.getElementById("img3");
const radio4 = document.getElementById("img4");
const radio0 = document.getElementById("img5"); //the zero is the fifth radio button




radio1.style.position = "relative";
radio1.style.width = "10px";
radio1.style.height = "10px";
radio1.style.checked = "checked";


radio2.style.position = "relative";
radio2.style.width = "10px";
radio2.style.height = "10px";
radio2.style.checked = "unchecked";


radio3.style.position = "relative";
radio3.style.width = "10px";
radio3.style.height = "10px";
radio3.style.checked = "unchecked";



radio4.style.position = "relative";
radio4.style.width = "10px";
radio4.style.height = "10px";
radio4.style.checked = "unchecked";




//0 made to make it easier for me
radio0.style.position = "relative";
radio0.style.width = "10px";
radio0.style.height = "10px";
radio0.style.checked = "unchecked";


radioBtn.push(radio0);
radioBtn.push(radio1);
radioBtn.push(radio2);
radioBtn.push(radio3);
radioBtn.push(radio4);
nextImgArr = [-2800, 0, -700, -1400, -2100]; //this holds the x-cordinate where the image is in the slide

radioBtn.forEach(element => {
    element.style.marginRight = "10px";

    element.style.left = "175px";
    element.style.top = "410px"



})

var imgNo = 1;


//for going backwards in the image carousel
function prev() {




    let leftVal = parseInt(slide.style.left);
    slide.style.left = (leftVal + 50) + "px";

    if (parseInt(slide.style.left) % 700 !== 0) {

        requestAnimationFrame(prev);

    }

    /*
        WHEN WE ARE AT THE FIRST IMAGE THEN WE HAVE EXTRA ONE TO THE LEFT (LAST IMAGE). 
        THEN WE JUMP TO THAT LAST IMAGE, THIS HELPS IT MAINTAIN THE CYCLE
        */
    if (parseInt(slide.style.left) === 700) {
        slide.style.left = -2800 + "px";


    }
    if (parseInt(slide.style.left) % 700 === 0) {
        for (let i = 0; i < nextImgArr.length; i++) {
            if (nextImgArr[i] === parseInt(slide.style.left)) imgNo = i;
        }
        radioBtn[imgNo].checked = "true";

    }
    // console.log(slide.style.left, imgNo);




}


//for going forward in the image carousel
function next() {


    slide.style.left = (parseInt(slide.style.left) - 50 + "px");
    if (parseInt(slide.style.left) % -700 !== 0) {
        requestAnimationFrame(next);

    }

    /*
    WHEN WE GET THE LAST IMAGE IN THE CAROUSEL IT WILL HAVE AN EXTRA ONE IMAGE (THE FIRST IMAGE) AND 
    WE HAVE TO GO TO THE FIRST ONE TO MAKE A CYCLE
    */
    if (parseInt(slide.style.left) === -3500) {
        slide.style.left = 0 + "px";

    }
    if (parseInt(slide.style.left) % 700 === 0) {
        for (let i = 0; i < nextImgArr.length; i++) {
            if (nextImgArr[i] === parseInt(slide.style.left)) imgNo = i;
        }
        radioBtn[imgNo].checked = "true";
        radioBtn[imgNo].style.backgroundColor = "green";
    }

    // console.log(Math.abs(parseInt(slide.style.left)), imgNo, slide.style.width);
    // console.log(Math.abs((5 + imgNo) % 5), rBtn.checked)

}








id = setInterval(function() {
    next();


}, 5000); //image changes every 5 seconds

function resetInterval() {
    clearInterval(id);
    id = setInterval(function() {
            next();

        },
        5000);
    // console.log(id);

}

btn1.addEventListener("click", () => { //[previous button



    prev();



});

btn2.addEventListener("click", () => { //next button



    next();



});


//goto function for getting to the desired image when the radio button is pressed

function goto(cordinate) {
    slide.style.left = (cordinate + "px");

}


//the radio button when pressed will go to the desired photo

radioBtn.forEach((element, index) => {
    element.addEventListener("click", () => {

        goto(nextImgArr[index]);
        resetInterval();

    })
})