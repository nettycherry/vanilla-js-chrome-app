const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");

function getTime(){
    const date = new Date(); // Date라는 객체를 만들어줌
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    clockTitle.innerText = `${hours <10? `0${hours}`: hours}:${minutes <10? `0${minutes}` : minutes}:${seconds <10? `0${seconds}` :seconds}`;
}
        
function init(){
 getTime();
 setInterval(getTime,1000); // 새로고침 없이 1초마다 시각이 변경됨
}

init();
