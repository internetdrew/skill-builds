'strict mode';

const arrows = document.querySelectorAll('.fa-arrow-down');
const form = document.querySelector('form');

const showInputStatus = function (input) {
  if (input === false) {
    document.body.style.backgroundColor = 'rgb(189, 87, 87)';
    return false;
  }
  if (input === true) {
    document.body.style.backgroundColor = 'rgb(87, 189, 130)';
    return true;
  }
};

const validUserName = function (input) {
  const validInput = input.value.length > 6;
  return showInputStatus(validInput);
};

const validEmail = function (input) {
  const regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
  const validInput = regex.test(input.value);
  return showInputStatus(validInput);
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

  if (input.id === 'username' && validUserName(input)) {
    revealNextField(field, nextField);
  }

  if (input.id === 'email' && validEmail(input)) {
    revealNextField(field, nextField);
  }

  if (input.id === 'password' && validPassword(input)) {
    revealNextField(field, nextField);
  }
};
// Event listeners
form.addEventListener('click', handleInput);
