const form = document.querySelector(".js-form"),
 input = form.querySelector("input"),
 greeting = document.querySelector(".js-greetings");

const USER_LS="currentUser" 
//USER_LS에 currentUser라는 키 이름을 할당(폴더명 같은 거)
 SHOWING_CN="showing"; //css classname 

function saveName(text){
    localStorage.setItem(USER_LS,text);
    //USER_LS(currentUser키)에 form에 입력된 text(입력된 이름value) set(저장)
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue=input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName(){
    form.classList.add(SHOWING_CN);
    //form display를 none에서 block으로 바꿔줌
    form.addEventListener("submit", handleSubmit);
    //이름을 제출하면 handleSubmit함수 실행
}

function paintGreeting(text){
    form.classList.remove(SHOWING_CN); 
    //form 입력칸을 지우고 Hello 텍스트를 띄우기 위함
    greeting.classList.add(SHOWING_CN);
    //greeting display를 none에서 block으로 바꿔줌
    greeting.innerText=`Hello ${text}`;
    //block으로 바뀐 greeting display에 텍스트를 띄워줌
}

function loadName(){
    const currentUser =localStorage.getItem(USER_LS);
    /*USER_LS 키("currentUser")에 해당하는 값을 LS에서 불러와 currentUser에 저장 
    Key: currentUser, value:form에 입력된 이름*/

    if(currentUser === null){
        askForName();
    } else{
        paintGreeting(currentUser);
    }
}

function init(){
    loadName();
}

init();