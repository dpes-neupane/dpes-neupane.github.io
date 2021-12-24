/* 
    the function accepts only string values


*/
// "carousel-container", "700px", "500px", "false"

sliderValues = {
    containerName: "carousel-container",
    containerWidth: "700px",
    containerHeight: "500px",
    overflow: "false",
    slideName: "carousel-slide",
    noOfImg: 5,
    transitionTime: 1149,
    holdTime: 5000,


}




function InitializeSliderContainer(sliderValues) {
    let carouselCont;



    carouselCont = document.getElementById(sliderValues.containerName);
    console.log()
    carouselCont.style.width = sliderValues.containerWidth;

    carouselCont.style.height = sliderValues.containerHeight;
    carouselCont.style.border = "2px solid black";
    carouselCont.style.margin = "auto";
    carouselCont.style.position = "relative";
    carouselCont.style.overflow = sliderValues.overflow;

    InitializeSlide(sliderValues, carouselCont);


    console.log(carouselCont)

}
/* The name of the images wrapper, the no of images there are in the slide

All the images in that slider will have the same class
 */

function InitializeSlide(slider, carouselCont) {



    let counter = 0;
    let imgArr = [];
    let radioArr = [];
    let imgArrWidth = []; //holds the top left corner value of each image in the slide
    let containerWidt = carouselCont.style.width;
    let containerHight = carouselCont.style.height;
    let holdtime;
    let imgNo = 1;
    noOfImg = slider.noOfImg;
    slide = document.getElementById(slider.slideName);
    containerWidt = parseInt(carouselCont.style.width)
    slide.style.width = ((slider.noOfImg + 2) * containerWidt) + "px";
    slide.style.margin = "auto auto auto -700px";
    slide.style.position = "absolute";
    slide.style.left = "0px";
    slide.style.right = "0px";
    transitionTime = slider.transitionTime;

    //buttons for sliding next and right
    btn1 = document.createElement("button");
    btn2 = document.createElement("button");
    btn1.id = "btn1";
    btn2.id = "btn2";
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
    carouselCont.appendChild(btn1);
    carouselCont.appendChild(btn2);




    //this will get all the images from the container
    imgArr = document.querySelectorAll("#" + slider.slideName + " img");

    imgSrc = [];
    imgArr.forEach(element => {
        imgSrc.push(element.src);
        element.remove();
    })

    // console.log(imgSrc);

    for (let i = 0; i < (noOfImg + 2); i++) {
        let img = document.createElement("img");
        // img.style.float = "left";
        if (i === 0) img.src = imgSrc[imgSrc.length - 1];
        if (i >= 1 && i < (noOfImg + 1)) {
            img.src = imgSrc[i - 1];
            console.log(img.src);
        }
        if (i === (noOfImg + 1)) img.src = imgSrc[0];
        slide.appendChild(img);
    }









    for (let i = 0; i < noOfImg; i++) {
        let radio = document.createElement("INPUT");
        radio.style.position = "relative";
        radio.style.width = "10px";
        radio.style.height = "10px";
        radio.style.marginRight = "10px";
        radio.style.checked = false;
        radio.style.left = "205px";
        radio.style.top = "410px";


        radio.setAttribute("type", "radio");
        radio.setAttribute("name", "radio");

        carouselCont.appendChild(radio);



    }
    radioArr = carouselCont.querySelectorAll("input");
    radioArr[0].setAttribute("checked", "checked");



    imgArrWidth.push(0);
    for (let i = 1; i < noOfImg; i++) {
        imgArrWidth.push(-(i) * containerWidt);
    }
    // console.log(imgArrWidth);







    let dataForAnimation = {
        containerWidt: containerWidt,
        imgArrWidth: imgArrWidth,
        slide: slide,
        radioArr: radioArr
    }
    btn1.addEventListener("click", () => { //[previous button


        counter = 0;
        prev();

        console.log(imgNo);


    });
    btn2.addEventListener("click", () => { //next button

        // counter = 0;

        next();
        // console.log(-(imgArrWidth[imgArrWidth.length - 1] - containerWidt));



    });


    function prev() {





        if (parseInt(slide.style.left) > 700) {
            slide.style.left = imgArrWidth[imgArrWidth.length - 1] + "px";
        }

        slide.style.left = (parseInt(slide.style.left) + 100) + "px";
        if (parseInt(slide.style.left) % containerWidt !== 0) {


            requestAnimationFrame(prev);


        }





        /*
            WHEN WE ARE AT THE FIRST IMAGE THEN WE HAVE EXTRA ONE TO THE LEFT (LAST IMAGE). 
            THEN WE JUMP TO THAT LAST IMAGE, THIS HELPS IT MAINTAIN THE CYCLE
            */
        if (parseInt(slide.style.left) === containerWidt) {

            slide.style.left = imgArrWidth[imgArrWidth.length - 1] + "px";
            imgNo = imgArrWidth.length - 1;



        }
        if (parseInt(slide.style.left) % containerWidt === 0) {
            for (let i = 0; i < imgArrWidth.length; i++) {
                if (imgArrWidth[i] === parseInt(slide.style.left)) imgNo = i;
            }
            radioArr[imgNo].checked = "true";


        }





    }

    function next() {
        if (parseInt(slide.style.left) < (imgArrWidth[imgArrWidth.length - 1] - 700)) {
            slide.style.left = 0 + "px";


        }
        // counter += 30;
        slide.style.left = (parseInt(slide.style.left) - 100 + "px");
        console.log(slide.style.left);
        if (parseInt(slide.style.left) % -(containerWidt) !== 0) {
            requestAnimationFrame(next);

        }







        /*
        WHEN WE GET THE LAST IMAGE IN THE CAROUSEL IT WILL HAVE AN EXTRA ONE IMAGE (THE FIRST IMAGE) AND 
        WE HAVE TO GO TO THE FIRST ONE TO MAKE A CYCLE
        */
        if (parseInt(slide.style.left) === (imgArrWidth[imgArrWidth.length - 1] - containerWidt)) {
            slide.style.left = 0 + "px";


        }


        if (parseInt(slide.style.left) % containerWidt === 0) {
            for (let i = 0; i < imgArrWidth.length; i++) {
                if (imgArrWidth[i] === parseInt(slide.style.left)) imgNo = i;
            }
            radioArr[imgNo].checked = "true";


        }


    }



    function goto(cordinate) {
        slide.style.left = (cordinate + "px");

    }


    //the radio button when pressed will go to the desired photo

    radioArr.forEach((element, index) => {
        element.addEventListener("click", () => {

            goto(imgArrWidth[index]);
            // resetInterval();

        })
    })





}























InitializeSliderContainer(sliderValues);
// InitializeSlide("carousel-slide", 3);