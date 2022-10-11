'strict mode';

const arrows = document.querySelectorAll('.fa-arrow-down');
const form = document.querySelector('form');

form.addEventListener('click', e => {
  const field = e.target.closest('.field');
  const arrow = field.querySelector('.fa-arrow-down');
  const input = field.querySelector('input');
  const nextField = field.nextElementSibling;

  console.log(field, input, arrow, nextField);
});
