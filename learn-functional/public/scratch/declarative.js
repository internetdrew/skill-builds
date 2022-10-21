const numbers = [1, 2, 3, 4, 5, 6];

// for (let i = 0; i < numbers.length; i++) {
//   numbers[i];
// }
// We stay away from loops, while, do, if, else, switch

const output = item => console.log(item);

numbers.forEach(output);

forEach(output, numbers);

// Instead of if else, we would use a ternary
const value = true ? 'this value' : 'that value';
