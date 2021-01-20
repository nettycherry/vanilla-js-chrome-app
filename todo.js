const toDoForm=document.querySelector(".js-toDoForm"),
 toDoInput= toDoForm.querySelector("input"),
 toDoList=document.querySelector(".js-toDoList");

const TODOS_LS="toDos";


function paintToDo(text){
    const li = document.createElement("li");
    const delBtn=document.createElement("button");
    delBtn.innerText="❌";
    //이모지 -> 윈도우 : 윈도우키+.또는; / 맥OS : 커맨드+컨트롤+스페이스
    const span=document.createElement("span");
    span.innerText=text;
    //submit function에서 온 텍스트값
    li.appendChild(span);
    li.appendChild(delBtn); 
    toDoList.appendChild(li);
    //appendChild(): puts something inside of its father
}

function handleSubmit(event){
    event.preventDefault();
    //이벤트 디폴트값 없애기(입력값 날라가는 현상)
    const currentValue=toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value="";
    //input에 값 넣고 엔터 누르면 to do 생성 및 삭제 가능
}

function loadToDos(){
    const toDos=localStorage.getItem(TODOS_LS);
    if(toDos!==null){

    } 
}

function init(){
 loadToDos();
 toDoForm.addEventListener("submit",handleSubmit);
}

init();