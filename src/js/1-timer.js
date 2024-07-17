'use strict';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const elementsData = {
  inputData: document.querySelector('#datetime-picker'),
  button: document.querySelector('button[data-start]'),
};

const elementsHours = {
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};
let userDate = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userDate = selectedDates[0];

    if (userDate <= new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      button.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function firstZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimer({ days, hours, minutes, seconds }) {
  elementsHours.days.textContent = firstZero(days);
  elementsHours.hours.textContent = firstZero(hours);
  elementsHours.minutes.textContent = firstZero(minutes);
  elementsHours.seconds.textContent = firstZero(seconds);
}

let timerInterval = 0;

elementsData.button.addEventListener('click', () => {
  elementsData.button.disabled = true;
  elementsData.inputData.disabled = true;

  timerInterval = setInterval(() => {
    const currentTime = new Date();
    const leftTime = userDate - currentTime;

    if (leftTime <= 0) {
      clearInterval(timerInterval);
      updateTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      inputData.disabled = false;
      return;
    }

    const timeUpdate = convertMs(leftTime);
    updateTimer(timeUpdate);
  }, 1000);
});
