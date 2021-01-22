const weather=document.querySelector(".js-weather")

const API_KEY="121c0ebfb7915385b05c83be7741c586";

const COORDS = 'coords'

function getWeather(lat,lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    //fetch 쓰면 데이터 불러올 수 있음. 백틱 ``, htttps://, $, units=metric 추가. 
    ).then(function(response){
        return response.json();
    }).then(function(json){
        const temparature=json.main.temp;
        const place=json.name;
        weather.innerText=`${temparature}@${place}`
        //then은 데이터를 다 불러오고 나서 함수 실행
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj))
}

function handleGeoSuccess(position){
    const latitude=position.coords.latitude;
    const longitude=position.coords.longitude;
    const coordsObj={
        latitude:latitude,
        longitude:longitude
        // 이름 똑같으니까 :이하 생략 가능
    };
    saveCoords(coordsObj);
    getWeather(latitude.longitude);
}

function handleGeoError(){
    console.log('Cant access geo location');
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError)

}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS)
    if(loadedCoords===null){
        askForCoords();
    } else {
        const parsedCoords=JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude,parsedCoords.longitude);
    }

}


function init(){
    loadCoords();
}

init();