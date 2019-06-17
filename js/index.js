function startPlayer(game, weather) {
    player = document.getElementById("player");

    audioPath = "audio/"

    if (game == "gc") { audioPath += "gc/"}
    if (game == "ww") { audioPath += "ww/"; }
    if (game == "nl") { audioPath += "nl/" + weather + "/"; }

    audioPath += new Date().getHours();
    audioPath += ".mp3";

    player.src = audioPath

    player.load();
}

let prevHour;
function checkTime() {
    currentHour = new Date().getHours();

    if (currentHour != prevHour) {
        updatePlayer();
        prevHour = currentHour;
    }
}

function updateClock() {
    clockDiv = document.getElementById("clock");

    hour = pad(convertTime(new Date().getHours()));
    minute = pad(new Date().getMinutes());
    second = pad(new Date().getSeconds());

    clockDiv.innerText = `${hour}:${minute}:${second}`
}

function getGame() { return document.getElementById("game-selector").value; }

function getWeather() { return document.getElementById("weather-selector").value; }

function updatePlayer() {
    game = getGame();
    weather = getWeather();

    if (game != "nl") { document.getElementById("weather-selector").disabled = true; }
    else { document.getElementById("weather-selector").disabled = false; }

    startPlayer(game, weather);
}

function main() {
    game = getGame();
    weather = getWeather();

    startPlayer(game, weather);
    updateClock();

    prevHour = new Date().getHours();
    setInterval(checkTime, 500);
    setInterval(updateClock, 500);
}

window.onload = main;

function pad(n) { return n < 10 ? '0' + n : n }

function convertTime(time) { return time > 12 ? time - 12 : time }
