'strict mode';

const arrows = document.querySelectorAll('.fa-arrow-down');
const form = document.querySelector('form');
const username = document.getElementById('username');

const showStatus = function (status) {
  if (status === 'error') {
    document.body.style.backgroundColor = 'rgb(189, 87, 87)';
  }
  if (status === 'success') {
    document.body.style.backgroundColor = 'rgb(87, 189, 130)';
  }
};

const validateUsername = function () {
  const valid = username.value.length > 6;
  console.log(valid);

  if (!valid) {
    console.log('Not enough characters');
    showStatus('error');
  }

  if (valid) showStatus('success');
};

// Event listeners
form.addEventListener('click', () => {
  const field = form.querySelector('.field');
  const arrow = field.querySelector('.fa-arrow-down');
  const input = field.querySelector('input');
  const nextField = field.nextElementSibling;

  console.log(field, arrow, nextField);
});
