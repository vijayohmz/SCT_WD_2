let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('laps');

function formatTime(ms) {
  const date = new Date(ms);
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
  return `${minutes}:${seconds}.${milliseconds}`;
}

function updateDisplay() {
  display.textContent = formatTime(elapsedTime + (Date.now() - startTime));
}

function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(updateDisplay, 10);
  isRunning = true;
  startStopBtn.textContent = 'Pause';
  lapBtn.disabled = false;
  resetBtn.disabled = false;
}

function pauseTimer() {
  clearInterval(timerInterval);
  elapsedTime += Date.now() - startTime;
  isRunning = false;
  startStopBtn.textContent = 'Start';
}

function resetTimer() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  startTime = 0;
  isRunning = false;
  display.textContent = '00:00:00.000';
  startStopBtn.textContent = 'Start';
  resetBtn.disabled = true;
  lapBtn.disabled = true;
  lapsList.innerHTML = '';
}

function recordLap() {
  const lapTime = formatTime(elapsedTime + (isRunning ? Date.now() - startTime : 0));
  const lapItem = document.createElement('li');
  lapItem.textContent = `Lap ${lapsList.children.length + 1}: ${lapTime}`;
  lapsList.appendChild(lapItem);
}

startStopBtn.addEventListener('click', () => {
  if (!isRunning) {
    startTimer();
  } else {
    pauseTimer();
  }
});

resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);
