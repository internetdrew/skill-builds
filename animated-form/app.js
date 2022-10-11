'strict mode';

const arrows = document.querySelectorAll('.fa-arrow-down');
const form = document.querySelector('form');

const shakeEl = function (inputEl) {
  inputEl.parentElement.style.animation = 'shake 0.2s ease';
  setTimeout(() => {
    inputEl.parentElement.style.animation = '';
  }, 250);
};

const showInputStatus = function (inputStatus, inputEl) {
  if (inputStatus === false) {
    document.body.style.backgroundColor = 'rgb(189, 87, 87)';
    shakeEl(inputEl);
    return false;
  }
  if (inputStatus === true) {
    document.body.style.backgroundColor = 'rgb(87, 189, 130)';
    return true;
  }
};

const validInputLength = function (inputEl, min) {
  const validInput = inputEl.value.length > min;
  return showInputStatus(validInput, inputEl);
};

const validEmail = function (inputEl) {
  const regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
  const validInput = regex.Eltest(inputEl.value);
  return showInputStatus(validInput, inputEl);
};

const revealNextField = function (curEl, nextEl) {
  curEl.classList.remove('active');
  curEl.classList.add('inactive');

  nextEl.classList.remove('inactive');
  nextEl.classList.add('active');
};

const handleInput = function (e) {
  const field = e.target.closest('.field');
  const arrow = field.querySelector('.fa-arrow-down');
  const input = field.querySelector('input');
  const nextField = field.nextElementSibling;

  if (e.target !== arrow) return;

  if (input.id === 'username' && validInputLength(input, 6)) {
    revealNextField(field, nextField);
  }

  if (input.id === 'email' && validEmail(input)) {
    revealNextField(field, nextField);
  }

  if (input.id === 'password' && validInputLength(input, 13)) {
    revealNextField(field, nextField);
  }
};
// Event listeners
form.addEventListener('click', handleInput);
