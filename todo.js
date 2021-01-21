const toDoForm=document.querySelector(".js-toDoForm"),
 toDoInput= toDoForm.querySelector("input"),
 toDoList=document.querySelector(".js-toDoList");

const TODOS_LS="toDos";

const toDos = []; 
//비어 있는 목록, to do 저장할 때마다 이 array에 저장되도록

function deleteToDo(event){
    console.log(event);

}

function saveToDo(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos))
    //LS는 string만 저장하기 때문에 javascript의 모든 object를 string으로 바꿔주는 JSON.stringify 이용
}


function paintToDo(text){
    const li = document.createElement("li");

    const delBtn=document.createElement("button");
    delBtn.innerText="❌";
    //이모지 -> 윈도우 : 윈도우키+.또는; / 맥OS : 커맨드+컨트롤+스페이스
    delBtn.addEventListener("click",deleteToDo);
    
    const span=document.createElement("span");
    span.innerText=text;
    //submit function에서 온 텍스트값
    
    const newId = toDos.length +1;
    //원래 배열은 0부터 시작이지만, id는 1부터 시작할 수 있게
    li.id=newId; //li에 id 부여

    li.appendChild(span);
    li.appendChild(delBtn); 
    toDoList.appendChild(li);
    /*appendChild(): puts something inside of its father
    li에 span, delBtn 넣고, ul에 li 넣고*/
    
    const toDoObj = {
        text: text, 
        //text라는 키에 paintToDo(text)의 text가 옴
        id:newId 
    };
    
    toDos.push(toDoObj); 
    //toDos array에 toDoObj 넣어줌
    saveToDo(); //push 다음에 호출해야 함
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
    const loadedToDos=localStorage.getItem(TODOS_LS);
    if(toDos!==null){
        console.log(loadedToDos);
        const parsedToDos = JSON.parse(loadedToDos);
        //string으로 저장된 것을 object로 바꿔줌
        console.log(parsedToDos);

    } 
}

function init(){
 loadToDos();
 toDoForm.addEventListener("submit",handleSubmit);
}

init();