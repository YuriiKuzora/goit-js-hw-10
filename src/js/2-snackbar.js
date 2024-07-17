'use strict';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const elements = {
  form: document.querySelector('.form'),
  input: document.querySelector('.delay-input'),
  button: document.querySelector('button'),
};

elements.form.addEventListener('submit', handlerSubmit);
elements.button.addEventListener('click', handlerClick);

function handlerSubmit(evt) {
  evt.preventDefault();

  const data = {};
  new FormData(evt.target).forEach((value, key) => {
    data[key] = value;
  });

  const delay = data.delay;
  const status = data.state;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (status === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  elements.input.value = '';

  promise
    .then(delay => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });
}
