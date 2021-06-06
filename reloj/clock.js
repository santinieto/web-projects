// Leo los objetos de tiempo
const hour    = document.querySelector(".hour");
const min     = document.querySelector(".min");
const seg     = document.querySelector(".seg");
const year    = document.querySelector(".year");
const month   = document.querySelector(".month");
const dayNum  = document.querySelector(".day-number");
const dayName = document.querySelector(".day-name");

// Nombres de los dias
dayNames = {
    0 : "Sun    -",
    1 : "Mon    -",
    2 : "Tue    -",
    3 : "Wed    -",
    4 : "Thr    -",
    5 : "Fri    -",
    6 : "Sat    -",
}

// Cargo el boton de volumen On/Off
const speaker   = document.querySelector("#sound");
let   mute;
if(speaker.classList.contains("fa-volume-mute")){
    mute        = true;
}
else{
    mute        = false;
}

// Me aseguro que la hora tenga dos digitos
formatDate = (data) => {
    if(data.toString().length < 2) return `0${data}`;
    return data;
};

// Sonido del reloj
PlaySound = (soundObj) => {
    var audio = new Audio('mixkit-clock-knob-spin-1062.wav');  
    if(mute == false){
        audio.play();
    }
  }

// Funcion para actualizar la hora
updateTime = () => {
    // Creo el objeto de fecha
    // Esto solo anda si lo pongo aca
    const myDateObj = new Date();

    // Actualizo la hora
    hour.textContent    = formatDate( myDateObj.getHours()     );
    min.textContent     = formatDate( myDateObj.getMinutes()   );
    seg.textContent     = formatDate( myDateObj.getSeconds()   );
    year.textContent    = formatDate( myDateObj.getYear()+1900 );
    month.textContent   = myDateObj.getMonth()+1;
    dayNum.textContent  = myDateObj.getDate();
    dayName.textContent = dayNames[myDateObj.getDay()];

    PlaySound("sound1");
};

// Llamo a la funcion apenas cargo la pagina
updateTime();

// Actualizo la hora cada 1 segundo (o 1000ms concretamente)
setInterval(updateTime, 1000);

// Boton para activar o apagar el sonido del reloj
speaker.addEventListener("click", () => {
    if(mute == true){
        mute = false;
        speaker.classList.replace("fa-volume-mute", "fa-volume-up");
    }
    else{
        mute = true
        speaker.classList.replace("fa-volume-up", "fa-volume-mute");
    }
})