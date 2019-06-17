function startPlayer(game) {
    player = document.getElementById("player");

    audioPath = "audio/"
    weather = "normal"

    if (game == "nl") { audioPath += "nl/" + weather + "/"; }
    if (game == "ww") { audioPath += "ww/"; }

    audioPath += new Date().getHours();
    audioPath += ".mp3";

    player.src = audioPath

    player.load();
}

let prevHour;
function checkTime() {
    currentHour = new Date().getHours();

    if (currentHour != prevHour) {
        startPlayer();
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

function updateGame() { startPlayer(getGame()) }

function main() {
    game = getGame();

    startPlayer(game);
    updateClock();

    prevHour = new Date().getHours();
    setInterval(checkTime, 500);
    setInterval(updateClock, 500);
}

window.onload = main;

function pad(n) { return n < 10 ? '0' + n : n }

function convertTime(time) { return time > 12 ? time - 12 : time }
