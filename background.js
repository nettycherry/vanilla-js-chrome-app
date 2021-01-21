//이미지 3개 중 랜덤으로 나오게 하는 js

const body= document.querySelector("body");

const IMG_NUMBER =3;

function paintImage(imgNumber) {
    const image = new Image();
    image.src = `images/${imgNumber+1}.jfif`
    //Math.random 함수가 0, 1, 2를 주어서
    image.classList.add("bgImage");
    body.appendChild(image);
}

function genRandom() {
    const number = Math.floor(Math.random()*IMG_NUMBER)
    //floor는 숫자내림 함수
    return number;
}

function init(){
    const randomNumber=genRandom();
    paintImage(randomNumber);
}

init();