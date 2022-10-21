// const person = {
//   firstName: 'Jim',
// };
// // We can't change person, but we can modify it's properties

// const person2 = Object.freeze({
//   firstName: 'Julia',
// });

const indexes = Object.freeze([0, 1, 2, 3, 4, 5]);

function addElement(arr) {
  //Mutates data; unpredictable and inconsistent. Manipulates array and anything that uses it.
  // indexes.push(arr.length);

  return Object.freeze([...arr, arr.length]);
}

console.log(addElement(addElement(indexes)));
