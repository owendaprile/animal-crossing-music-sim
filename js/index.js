function startPlayer(game, weather) {
    let player = document.getElementById("player");

    let audioPath = "static/audio/" + game + "/";

    if (game === "nl") { audioPath += weather + "/"; }

    audioPath += new Date().getHours();
    audioPath += ".mp3";

    player.src = audioPath

    player.load();
}

let prevHour;
function checkTime() {
    let currentHour = new Date().getHours();

    if (currentHour != prevHour) {
        updatePlayer();
        prevHour = currentHour;
    }
}

function pad(n) { return n < 10 ? '0' + n : n }

function convertTime(time) { return time > 12 ? time - 12 : time }

function updateClock() {
    let clockDiv = document.getElementById("clock");

    let hour = convertTime(new Date().getHours());
    let minute = pad(new Date().getMinutes());

    clockDiv.innerText = `${hour}:${minute}`
}

function getGame() { return document.getElementById("game-selector").value; }

function getWeather() { return document.getElementById("weather-selector").value; }

function updatePlayer() {
    let game = getGame();
    let weather = getWeather();

    if (game != "nl") { document.getElementById("weather-selector").disabled = true; }
    else { document.getElementById("weather-selector").disabled = false; }

    updateGrass();

    startPlayer(game, weather);
}

function updateGrass() {
    let weather = getWeather()

    let imageLink = "url(\"static/img/grass/grass-"

    if (weather === "normal") {
        imageLink += weather
    } else if (weather === "rain") {
        imageLink += "normal"
    } else if (weather === "snow") {
        imageLink += weather
    }

    imageLink += ".png\")"

    document.body.style.backgroundImage = imageLink
}

function main() {
    let game = getGame();
    let weather = getWeather();

    startPlayer(game, weather);
    updateClock();
    updateGrass();

    prevHour = new Date().getHours();
    setInterval(checkTime, 500);
    setInterval(updateClock, 500);
}

window.onload = main;
