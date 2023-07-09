const remainingDiv = document.getElementById('remainingDiv');
const remainingForm = document.getElementById('remainingForm');
const dateInput = document.getElementById('datePicker');
const timeDiv = document.getElementById('timeDiv');
const spans = document.querySelectorAll('span');
const resetButton = document.getElementById('resetButton');
const complete = document.getElementById('complete');
const completeButton = document.getElementById('completeButton');

let chosenDate = "";
let currentDateValue = new Date().getTime();
let currentTimeInterval;
let localStorageTime;

const today = new Date().toISOString().split('T')[0];
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

dateInput.setAttribute('min', today);

function updateDOM() {
    currentTimeInterval = setInterval(() => {
        const now = new Date().getTime();
        const betweenDate = currentDateValue - now;
        // console.log(betweenDate);
        const days = Math.floor(betweenDate / day);
        const hours = Math.floor((betweenDate % day) / hour);
        const minutes = Math.floor((betweenDate % hour) / minute);
        const seconds = Math.floor((betweenDate % minute) / second);
        // console.log(days, hours, minutes, seconds);
        remainingDiv.hidden = true;
        if (betweenDate < 0) {
            timeDiv.hidden = true;
            complete.hidden = false;
            clearInterval(currentTimeInterval)
        } else {
            remainingDiv.hidden = true;
            timeDiv.hidden = false;


            spans[0].textContent = `${days}`;
            spans[1].textContent = `${hours}`;
            spans[2].textContent = `${minutes}`;
            spans[3].textContent = `${seconds}`;
        }



    }, 1000);

}

function reset() {
    clearInterval(currentTimeInterval);
    timeDiv.hidden = true;
    complete.hidden = true;
    remainingDiv.hidden = false;
    localStorage.removeItem('time');
}


resetButton.addEventListener('click', reset);


function calculateTime(e) {
    e.preventDefault();
    chosenDate = remainingForm.date.value;
    // console.log(new Date(chosenDate).getTime())
    // console.log(new Date().getTime())
    localStorageTime = {
        date: chosenDate,
    };
    localStorage.setItem('time', JSON.stringify(localStorageTime));
    if (chosenDate === "") {
        alert("Please choose date!");
    } else {
        currentDateValue = new Date(chosenDate).getTime();
        updateDOM();
    }

}

function refleshTime() {

    if (localStorage.getItem('time')) {
        remainingDiv.hidden = true;
        localStorageTime = JSON.parse(localStorage.getItem('time'));
        chosenDate = localStorageTime.date;
        currentDateValue = new Date(chosenDate).getTime();
        updateDOM();
    }
}

remainingForm.addEventListener('submit', calculateTime);
completeButton.addEventListener('click', reset);

refleshTime();