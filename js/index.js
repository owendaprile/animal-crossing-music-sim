function startPlayer(game, weather) {
    let player = document.getElementById("player");

    if (game === "ns") {
        if (!player.paused) player.pause();
        return;
    }
    let audioPath;
    if (game === "ww" || game === "cf") {
        audioPath = "static/audio/ww-cf/";
    } else {
        audioPath = "static/audio/" + game + "/";
    }
    if (gameSupportsWeather(game)) { audioPath += weather + "/"; }

    audioPath += new Date().getHours();
    audioPath += ".opus";

    player.src = audioPath

    // Start playback. If it is blocked by the browser, reset the game selector.
    // Since Chrome and Firefox only allow playback of audio after the user has
    // interacted with the page, audio will be allowed to play on selection of a game.
    console.debug(`Starting playback of '${audioPath}'`);
    player.play()
        .catch((err) => {
            console.debug("Playback failed:\n" + err);
            document.getElementById("game-selector").selectedIndex = 0;
        })
}

let prevHour;
function checkTime() {
    let currentHour = new Date().getHours();

    if (currentHour !== prevHour) {
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

    let event = game;
    if (gameSupportsWeather(game)) { event += ", " + weather; }
    umami.trackEvent(event, "game");

    // console.debug("Should the weather selector be enabled?", gameSupportsWeather(game));
    document.getElementById("weather-selector").disabled = !gameSupportsWeather(game);

    updateGrass();
    startPlayer(game, weather);
}

function gameSupportsWeather(game) {
    return (game === "ww" || game === "cf" || game === "nl" || game === "nh")
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
