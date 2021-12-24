/* 
    The first function is all that is needed to create the slider. All the functions are called through it. 
    The first function accepts the parameters as an object and css properties are expected to be string values.
    The transition time is the amount of pixels increased in each update. It is not perfect. 
    It will try to be exactly divisible to the width of the image OR containerWidth. So, try to put on values that exactly divides the width 
    of the image. So, NO PRIME NUMBERED WIDTH VALUES.


*/

sliderValues = {
    containerName: "carousel-container-1",
    containerWidth: "700px",
    containerHeight: "500px",
    overflow: "hidden",
    slideName: "carousel-slide-1",
    noOfImg: 5,
    transitionTime: 40,
    holdingTime: 5000



}
sliderValues2 = {
    containerName: "carousel-container-2",
    containerWidth: "500px",
    containerHeight: "300px",
    overflow: "hidden",
    slideName: "carousel-slide-2",
    noOfImg: 3,
    transitionTime: 20,
    holdingTime: 2000



}




function InitializeSliderContainer(sliderValues) {
    let carouselCont;



    carouselCont = document.getElementById(sliderValues.containerName);

    carouselCont.style.width = sliderValues.containerWidth;

    carouselCont.style.height = sliderValues.containerHeight;
    carouselCont.style.border = "2px solid black";
    carouselCont.style.margin = " 10px auto";
    carouselCont.style.position = "relative";
    carouselCont.style.overflow = sliderValues.overflow;

    obj = InitializeSlide(sliderValues, carouselCont);
    sliderValues.next = obj.next;
    sliderValues.radioArr = obj.radioArr;
    return sliderValues;



}
/* The name of the images wrapper, the no of images there are in the slide

All the images in that slider will have the same class
 */

function InitializeSlide(slider, carouselCont) {


    let slide;

    let imgArr = [];
    let radioArr = [];
    let imgArrWidth = []; //holds the top left corner value of each image in the slide
    let containerWidt = carouselCont.style.width;

    let imgNo = 1;
    noOfImg = slider.noOfImg;

    slide = document.getElementById(slider.slideName);
    containerWidt = parseInt(carouselCont.style.width)
    slide.style.width = ((slider.noOfImg + 2) * containerWidt) + "px";
    slide.style.margin = "auto auto auto -" + containerWidt + "px";
    slide.style.position = "absolute";
    slide.style.left = "0px";
    slide.style.right = "0px";
    transitionTime = slider.transitionTime;
    if (containerWidt % transitionTime !== 0) {
        while (transitionTime !== containerWidt) {
            if (containerWidt % transitionTime === 0) break;
            transitionTime++;
        };
    }

    //buttons for sliding next and right
    btn1 = document.createElement("button");
    btn2 = document.createElement("button");
    btnImg1 = document.createElement("img");
    btnImg1.id = "left-arrow";
    btnImg2 = document.createElement("img");
    btnImg2.id = "right-arrow";
    btnImg1.src = "./images/arrow-left-solid.svg";
    btnImg2.src = "./images/arrow-right-solid.svg";


    btn1.id = "btn1" + slider.slideName;
    btn2.id = "btn2" + slider.slideName;
    btn1.style.position = "relative";
    btn1.style.opacity = "40%";
    btn1.style.width = "50px";
    btn1.style.height = "50px";
    btn1.style.top = "40%";

    btn2.style.position = "relative";
    btn2.style.opacity = "40%";
    btn2.style.width = "50px";
    btn2.style.height = "50px";
    btn2.style.top = "40%";
    btn2.style.left = (containerWidt - 100) + "px";
    btn1.appendChild(btnImg1);
    btn2.appendChild(btnImg2);
    carouselCont.appendChild(btn1);
    carouselCont.appendChild(btn2);





    //this will get all the images from the container
    imgArr = document.querySelectorAll("#" + slider.slideName + " img");

    imgSrc = [];
    imgArr.forEach(element => {
        imgSrc.push(element.src);
        element.remove();
    })



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








    let div = document.createElement("div");
    div.id = "radio-wrappers";
    carouselCont.appendChild(div);
    div.style.position = "absolute";
    div.style.top = "90%";
    div.style.left = "38%";

    for (let i = 0; i < noOfImg; i++) {
        let radio = document.createElement("INPUT");
        // radio.style.position = "relative";
        radio.style.width = "10px";
        radio.style.height = "10px";
        radio.style.marginRight = "10px";
        radio.style.checked = false;


        radio.setAttribute("type", "radio");
        radio.setAttribute("name", "radio" + slider.slideName);

        div.appendChild(radio);



    }
    radioArr = carouselCont.querySelectorAll("input");
    radioArr[0].setAttribute("checked", "checked");



    imgArrWidth.push(0);
    for (let i = 1; i < noOfImg; i++) {
        imgArrWidth.push(-(i) * containerWidt);
    }
    // console.log(imgArrWidth);











    btn1.addEventListener("click", () => { //[previous button


        console.log("what")
        prev();




    });
    btn2.addEventListener("click", () => { //next button



        next();
        // console.log(-(imgArrWidth[imgArrWidth.length - 1] - containerWidt));



    });


    function prev() {





        if (parseInt(slide.style.left) > 700) {
            slide.style.left = imgArrWidth[imgArrWidth.length - 1] + "px";
        }
        console.log('what', slide.style.left)

        slide.style.left = (parseInt(slide.style.left) + transitionTime) + "px";
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
        slide.style.left = (parseInt(slide.style.left) - transitionTime + "px");

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
            // resetInterval(id);

        })
    })


    obj = {
        next: next,
        radioArr: radioArr
    }



    return obj;



    // id = startInterval(sliderValues.holdingTime);




}




function startInterval(next, holdingTime) {
    id = setInterval(next, holdingTime);
    return id;
};
















val1 = InitializeSliderContainer(sliderValues);
console.log(val1);

val2 = InitializeSliderContainer(sliderValues2);
id1 = startInterval(val1.next, val1.holdingTime);
val1.radioArr.forEach(element => {
    element.addEventListener("click", () => {
        clearInterval(id1);
        id1 = setInterval(val1.next, val1.holdingTime);
    })

})
id2 = startInterval(val2.next, val2.holdingTime);

val2.radioArr.forEach(element => {
    element.addEventListener("click", () => {
        clearInterval(id2);
        id2 = setInterval(val2.next, val2.holdingTime);
    })

});