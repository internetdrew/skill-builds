const elem = tag => document.createElement(tag);
const text = string => document.createTextNode(string);
const getElem = id => document.getElementById(id);
const getText = () => getElem('message-text').value;

const on = R.curry(function (eventType, element, fn) {
  element.addEventListener(eventType, fn);
});

const addClass = R.curry(function (className, element) {
  element.classList.add(className);

  return element;
});

const append = R.curry(function append(node, element) {
  element.appendChild(node);

  return element;
});

const attr = R.curry(function (attributeName, attributeValue, element) {
  element.setAttribute(attributeName, attributeValue);

  return element;
});

const setDataId = attr('data-id');

const setOne = setDataId('1');
