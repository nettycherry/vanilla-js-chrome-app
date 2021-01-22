const toDoForm=document.querySelector(".js-toDoForm"),
 toDoInput= toDoForm.querySelector("input"),
 toDoList=document.querySelector(".js-toDoList");

const TODOS_LS="toDos";

let toDos = []; 
//비어 있는 목록, to do 저장할 때마다 이 array에 저장되도록


function deleteToDo(event){
    //투두리스트에서 어떤 li의 button이 삭제 클릭되었는지 알아야 함
    const btn = event.target;
    const li = btn.parentNode;
    //parentNode는 console.dir(event.target)으로 li의 부모 element 찾아준 것
    toDoList.removeChild(li)
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
        /*parseInt는 string인 li.id를 숫자로 바꿔줌. 
        toDo.id가 숫자이기 때문에 안 바꿔주면 오류남.*/
        //삭제된 li의 id가 아닌 것들만(삭제되지 않은 것들만) 필터링 해라//
    });
    /*filter 함수는 array 내 모든 item 각각에 실행되고,
    true인 item만, 체크된 item만 가지고 새로운 array를 만듦.*/
    toDos=cleanToDos; //toDos를 cleanToDos로 교체
    saveToDo()

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
    /*submit function에서 온 텍스트값
    paintToDo(text)의 text*/

    
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
    /*toDos array에 toDoObj 넣어줌
    toDoObj를 따로 선언하고 push하는 이유는 lS에 값을 toDoObj에서 정한 형식대로 저장해서 새로고침해도 값이 남아있도록*/

    saveToDo(toDoObj); //push 다음에 호출해야 함
}

function handleSubmit(event){
    event.preventDefault();
    //이벤트 디폴트값 없애기(입력값 날라가는 현상)
    const currentValue=toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value="";
    /*input에 값 넣고 엔터 누르면 to do 생성 및 삭제 가능
    ""는 remove the text from the input*/
}

function loadToDos(){
    const loadedToDos=localStorage.getItem(TODOS_LS);
    if(toDos!==null){
        const parsedToDos = JSON.parse(loadedToDos);
        //string으로 저장된 것을 object로 바꿔줌
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        }); 
        /*array function의 하나인 forEach는 parsed 투두리스트 각각의 text를 불러옴
        function(toDo)에서 toDo는 potato, whatever 바꿔도 결과 똑같음
        (forEach가 불러오는 current element를 toDo가 대표?)
        console.log(toDo.text)하면 새로고침 시 투두리스트 초기화되지만,
        paintToDo는 새로고침해도 투두리스트 초기화 X, 화면에 표시*/
    } 
}

function init(){
 loadToDos();
 toDoForm.addEventListener("submit",handleSubmit);
}

init();