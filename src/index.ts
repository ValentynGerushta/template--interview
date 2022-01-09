import './index.css';
import {Clock, Edit} from './clock';

let lightDuration: number = 3000; // 3 seconds
let startTimer: number = 0, stopTimer: number = 0;
let lightEnabled: boolean = false;
const clock: Clock = new Clock();

const displayHour = document.getElementById('timeHour');
const displayMin = document.getElementById('timeMin');
const displaySec = document.getElementById('timeSec');
const buttonMode = document.getElementById("buttonMode");
const buttonIncrease = document.getElementById("buttonIncrease");
const buttonLight = document.getElementById("buttonLight");
const display = document.getElementById("display");

function updateDisplay(): void{
    displayHour.innerText = clock.getHours();
    displayMin.innerText = clock.getMinutes();
    displaySec.innerText = clock.getSeconds();

    // turn off the display light when time is out
    if(lightEnabled === true){
        stopTimer = Date.now() - startTimer;
        if(stopTimer > lightDuration){
            lightEnabled = false;
            display.style.backgroundColor = "lightgrey"; // turn off the display light
        }
    }
}

buttonMode.onclick = () => {
    clock.nextMode(); // increment mode

    // hour is editable
    if(clock.getMode() === Edit.Hour){
        // only hour part is pulsing
        displayHour.style.animation = "PULSE 1s infinite";
        displayMin.style.animation = "none";
    }
    // minute is editable
    else if(clock.getMode() === Edit.Minute){
        // only minute part is pulsing
        displayHour.style.animation = "none";
        displayMin.style.animation = "PULSE 1s infinite";
    }
    // time is not editable
    else{
        // no pulsing, all is static
        displayHour.style.animation = "none";
        displayMin.style.animation = "none";
    }
    updateDisplay();
}

buttonIncrease.onclick = () => {
    // add 1 hour or 1 minute, if time is editable
    clock.increaseTime();
    updateDisplay();
}

buttonLight.onclick = () => {
    display.style.backgroundColor = "yellow"; // turn on the display light
    lightEnabled = true;
    startTimer = Date.now();
}

setInterval(updateDisplay, 1000); // update each second
