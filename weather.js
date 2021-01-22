const weather=document.querySelector(".js-weather")

const API_KEY="121c0ebfb7915385b05c83be7741c586";

const COORDS = 'coords'

/*javascript로 특정 url 가져오는 방법 
웹사이트 새로고침 없이도 데이터를 계속 불러들임*/ 

function getWeather(lat,lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    /*fetch 쓰면 데이터 불러올 수 있음. 
    백틱 ``, htttps://, $, units=metric(기온 단위) 추가.*/ 
    ).then(function(response){
        return response.json();
    }).then(function(json){
        //console.log(json);으로 main 속 temp, name 확인
        const temparature=json.main.temp;
        const place=json.name;
        weather.innerText=`${temparature}@${place}`
        /*then은 데이터를 다 불러오고 나서 함수 실행. 
        데이터 불러오는 게 중간에 중단되지 않도록.
        javascript에서 뭔가가 끝나길 기다리기 위해서는 then을 씀*/
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj))
    //string으로 바꿀 대상(coordsObj)를 최초에 변수로 선언하지 않아서 파라미터-인자로 받아옴
}

function handleGeoSuccess(position){
    
    const latitude=position.coords.latitude;
    const longitude=position.coords.longitude;
    //position 객체 속 coords (역시 console.log(position)으로 확인 가능)

    const coordsObj={
        latitude:latitude,
        longitude:longitude
        /* 객체에 변수의 이름을 똑같이 가져오고, 
        객체의 key도 똑같이 정하면 :이하 생략 가능*/
    };
    saveCoords(coordsObj);
    //saveCoords 함수 따로 만들지 않고 localStorage.setItem... 해도 됨

    getWeather(latitude,longitude);
}

function handleGeoError(){
    console.log('Cant access geo location');
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError)
    //navigator는 좌표 요청 함수
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS)
    if(loadedCoords===null){
        askForCoords();
    } else {
        const parsedCoords=JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude,parsedCoords.longitude);
        /*좌표값이 없는 경우(if) askForCoords 실행 -> 유저가 allow 하면 ->
        handleGeoSuccess 실행 -> getWeather 실행 -> 최종적으로 API 호출 -> 좌표값 가져오는데,
        이미 좌표값이 있는 경우(else) getWeather 함수 새로? 실행시켜 
        parsedCoords 객체 속 latitude와 longitude 키의 값을 계속? 받아와야 함*/ 
    }

}


function init(){
    loadCoords();
}

init();