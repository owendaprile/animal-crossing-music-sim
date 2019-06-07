function startPlayer() {
    player = document.getElementById("player");

    player.src = "audio/ww/" + new Date().getHours() + ".mp3";

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

function main() {
    startPlayer();

    prevHour = new Date().getHours();
    setInterval(checkTime, 1000);
}

window.onload = main;