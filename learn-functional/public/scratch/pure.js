// pure
// easy to test, easy to predict

// returns the same result for the same input
// pure
function add(x, y) {
  return x + y;
}
add(1, 2); //3
add(1, 2); //3
add(1, 2); //3

// impure
function add2(x, y) {
  console.log(x + y); // external and produces and observable side effect
  return x + y;
}
