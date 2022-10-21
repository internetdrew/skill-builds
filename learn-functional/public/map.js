function app(state, output) {
  R.compose(append(view(state)), clear())(output);
}

function view(state) {
  const el = elem('div');

  return state.length > 0
    ? R.pipe(...state.map((content, index) => append(message(content, index))))(
        elem('div')
      )
    : el;
}

function message(content, index) {
  return R.compose(
    append(text(content)),
    attr('data-index', index),
    addClass('bg-warning'),
    addClass('p-2')
  )(elem('div'));
}

const buttonClick = on('click', getElem('message-button'));

app(
  Object.freeze([
    {
      firstName: 'Jane',
      lastName: 'Doe',
      age: 34,
    },
    { firstName: 'John', lastName: 'Doe', age: 25 },
    { firstName: 'Jim', lastName: 'Smith', age: 53 },
  ]),
  getElem('message-list')
);
