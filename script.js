let timer;
let isRunning = false;
let elapsedTime = 0; // in milliseconds
let lapCount = 0;
let lastLapTime = 0;

const display = document.getElementById('display');
const currentLap = document.getElementById('currentLap');
const lapList = document.getElementById('lapList');

// Retrieve stored laps from localStorage
function loadLaps() {
    const laps = JSON.parse(localStorage.getItem('laps')) || [];
    laps.forEach((lap, index) => {
        const lapTime = document.createElement('li');
        lapTime.innerHTML = `Lap ${index + 1}: <span>${formatTime(lap)}</span>`;
        lapList.appendChild(lapTime);
    });
}

// Save lap to localStorage
function saveLap(time) {
    const laps = JSON.parse(localStorage.getItem('laps')) || [];
    laps.push(time);
    localStorage.setItem('laps', JSON.stringify(laps));
}

function formatTime(ms) {
    const date = new Date(ms);
    return date.toISOString().substr(11, 8);
}

function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        const startTime = Date.now() - elapsedTime;
        timer = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 1000);
    }
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
    }
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    lastLapTime = 0;
    updateDisplay();
    currentLap.textContent = 'No Lap Recorded';
    lapList.innerHTML = ''; // Clear lap history
    lapCount = 0;
    localStorage.removeItem('laps'); // Clear stored laps
}

function recordLap() {
    if (isRunning) {
        lapCount++;
        const currentLapTime = elapsedTime - lastLapTime;
        lastLapTime = elapsedTime;
        const lapTime = formatTime(currentLapTime);
        const lapTimeElement = document.createElement('li');
        lapTimeElement.innerHTML = `Lap ${lapCount}: <span>${lapTime}</span>`;
        lapList.appendChild(lapTimeElement);
        currentLap.textContent = `Lap ${lapCount}: ${lapTime}`;
        saveLap(currentLapTime);
    }
}

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', recordLap);

// Load stored laps when the page loads
window.onload = loadLaps;


