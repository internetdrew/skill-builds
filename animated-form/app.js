'strict mode';

const arrows = document.querySelectorAll('.fa-arrow-down');
const form = document.querySelector('form');

const showStatus = function (status) {
  if (status === 'error') {
    document.body.style.backgroundColor = 'rgb(189, 87, 87)';
  }
  if (status === 'success') {
    document.body.style.backgroundColor = 'rgb(87, 189, 130)';
  }
};

const validUserName = function (input) {
  const valid = input.value.length > 6;

  if (!valid) {
    showStatus('error');
  }

  if (valid) {
    showStatus('success');
    return true;
  }
};

const validEmail = function (input) {
  const regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
  const valid = regex.test(input.value);

  if (!valid) {
    showStatus('error');
  }

  if (valid) {
    showStatus('success');
    return true;
  }
};

const revealNextField = function (curEl, nextEl) {
  curEl.classList.remove('active');
  curEl.classList.add('inactive');

  nextEl.classList.remove('inactive');
  nextEl.classList.add('active');
};

// Event listeners
form.addEventListener('click', e => {
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
});
